// server.js
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { MongoClient } = require("mongodb");
require("dotenv").config();

puppeteer.use(StealthPlugin()); // Use stealth plugin to avoid detection

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI; // MongoDB connection string from .env
const client = new MongoClient(uri);

// Utility function to validate URLs
const isValidURL = (string) => {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
};

// API Endpoint to fetch reviews
app.get("/api/reviews", async (req, res) => {
    const { page: pageURL } = req.query;

    if (!pageURL) {
        return res.status(400).json({ error: "URL is required" });
    }

    if (!isValidURL(pageURL)) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    try {
        await client.connect();
        const database = client.db("ReviewData"); // Use the database name directly
        const reviewsCollection = database.collection("reviews");

        // Check if reviews are already in the database
        const existingReviews = await reviewsCollection.findOne({ url: pageURL });

        if (existingReviews) {
            return res.json({
                reviews_count: existingReviews.reviews.length,
                reviews: existingReviews.reviews,
            });
        }

        const browser = await puppeteer.launch({
            executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", // Path to Edge executable
            headless: true, // Run in headless mode for production
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Set User-Agent to mimic Microsoft Edge
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.54"
        );

        console.log(`[INFO] Navigating to: ${pageURL}`);

        // Navigate to the page and wait for it to load
        await page.goto(pageURL, { waitUntil: "domcontentloaded", timeout: 60000 });

        // Wait for dynamic content to load (adjust selector based on inspection)
        try {
            console.log("[INFO] Waiting for review section...");
            await page.waitForSelector(".review-section", { timeout: 15000 }); // Update selector based on actual HTML structure

            console.log("[INFO] Review section found. Scraping data...");
            const reviews = await page.evaluate(() => {
                const reviewElements = document.querySelectorAll(".review"); // Adjust selector based on actual HTML structure
                return Array.from(reviewElements).map((reviewElement) => ({
                    title:
                        reviewElement.querySelector(".review-title")?.innerText.trim() ||
                        "No Title",
                    body:
                        reviewElement.querySelector(".review-body")?.innerText.trim() ||
                        "No Content",
                    rating:
                        reviewElement.querySelector(".review-rating")?.innerText.trim() ||
                        "No Rating",
                    reviewer:
                        reviewElement.querySelector(".reviewer-name")?.innerText.trim() ||
                        "Anonymous",
                }));
            });

            console.log("[INFO] Reviews scraped successfully:", reviews);

            // Insert scraped reviews into the database
            await reviewsCollection.insertOne({ url: pageURL, reviews });

            await browser.close();

            res.json({ reviews_count: reviews.length, reviews });
        } catch (error) {
            console.error(`[ERROR] Failed to scrape reviews: ${error.message}`);
            throw new Error("Review section not found or failed to scrape.");
        }
    } catch (error) {
        console.error(`[ERROR] Failed to fetch reviews: ${error.message}`);
        res.status(500).json({ error: "Failed to fetch reviews. Please try again later." });
    } finally {
        await client.close(); // Ensure the client is closed after operations
    }
});

app.listen(port, () => {
    console.log(`[INFO] Server running at http://localhost:${port}`);
});

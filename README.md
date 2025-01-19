# Extract Product Reviews API

This project provides an API for extracting product reviews dynamically from e-commerce websites using **Node.js+express** and **OpenAI**. The application is built with Node.js and is deployed on **React**.

### **GET /api/reviews**
Extract reviews from a product page dynamically.

#### **Query Parameters**
| Parameter | Type   | Description                            |
|-----------|--------|----------------------------------------|
| `url`     | string | The URL of the product page to scrape. |

## Features
- Dynamically identifies CSS selectors for extracting reviews using **OpenAI**.
- Handles pagination to scrape all reviews on the product page.
- Cleans HTML content to focus on relevant data.
- Works seamlessly with modern e-commerce platforms like Shopify.

### Steps
1. Clone the repository:
   git clone 
   cd <project-folder>

2. Install dependencies:
   1. Move to frontend -
                        1. run " npm install "
                        2. run " npm run dev "

   2. Move to backend -
                        1. run " npm install "
                        2. run " node server.js "


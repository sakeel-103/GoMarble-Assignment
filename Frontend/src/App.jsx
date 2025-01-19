import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ReviewsPage from "./ReviewsPage";
import Navbar from "./Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react'; // Import React (though not strictly necessary with React 17+)
import ReactDOM from 'react-dom/client'; // Import ReactDOM for creating the root
import './index.css'; // Import CSS for styling
import App from './App'; // Import the main App component

// Create the root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

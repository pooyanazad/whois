import axios from "axios";

// Define the API URL and key
const API_URL = "https://nameauditor-whois-v1.p.rapidapi.com/whois";
const API_KEY = "your-x-rapidapi-key-here";

// Define a function to get the whois data for a domain
const getWhoisData = async (domain) => {
  try {
    // Make a GET request to the API with the domain as a query parameter
    const response = await axios.get(API_URL, {
      params: { domain: domain },
      headers: {
        "x-rapidapi-host": "nameauditor-whois-v1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });
    // Return the data from the response
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error(error);
    return null;
  }
};

// Define a function to check the availability of a domain
const checkAvailability = async (domain) => {
  // Get the whois data for the domain
  const data = await getWhoisData(domain);
  // Check if the data has a status property
  if (data && data.status) {
    // Return true if the status is "available", false otherwise
    return data.status === "available";
  } else {
    // Return null if the data is invalid or missing
    return null;
  }
};

// Define a function to display the results on the web page
const displayResults = (domain, available) => {
  // Get the elements from the document
  const domainInput = document.getElementById("domain-input");
  const resultText = document.getElementById("result-text");
  const resultIcon = document.getElementById("result-icon");
  // Clear the input value
  domainInput.value = "";
  // Check the availability value
  if (available === true) {
    // Set the result text to "Available"
    resultText.textContent = "Available";
    // Set the result icon to a check mark
    resultIcon.className = "fas fa-check-circle";
    // Set the result color to green
    resultText.style.color = "green";
    resultIcon.style.color = "green";
  } else if (available === false) {
    // Set the result text to "Taken"
    resultText.textContent = "Taken";
    // Set the result icon to a cross mark
    resultIcon.className = "fas fa-times-circle";
    // Set the result color to red
    resultText.style.color = "red";
    resultIcon.style.color = "red";
  } else {
    // Set the result text to "Error"
    resultText.textContent = "Error";
    // Set the result icon to an exclamation mark
    resultIcon.className = "fas fa-exclamation-circle";
    // Set the result color to yellow
    resultText.style.color = "yellow";
    resultIcon.style.color = "yellow";
  }
};

// Define a function to handle the form submission
const handleSubmit = async (event) => {
  // Prevent the default behavior of the form
  event.preventDefault();
  // Get the domain value from the input element
  const domainInput = document.getElementById("domain-input");
  const domain = domainInput.value.trim();
  // Check if the domain is valid
  if (domain) {
    // Check the availability of the domain
    const available = await checkAvailability(domain);
    // Display the results on the web page
    displayResults(domain, available);
  } else {
    // Display an error message if the domain is empty
    alert("Please enter a domain name");
  }
};

// Get the form element from the document
const form = document.getElementById("form");
// Add an event listener to the form submission
form.addEventListener("submit", handleSubmit);

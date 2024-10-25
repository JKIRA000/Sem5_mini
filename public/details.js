// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch and display flight details
async function fetchFlightDetails() {
    const flightNumber = getUrlParameter('flightNumber'); // Get flight number from URL
    console.log(`fetch details for flight number:${flightNumber}`)
    const response = await fetch(`/api/flight/${flightNumber}`); // Fetch data from API
    const flightDetails = await response.json(); // Parse JSON response

    const flightInfoDiv = document.getElementById('flight-info');

    if (flightDetails) {
        flightInfoDiv.innerHTML = `
            <p><strong>Flight Number:</strong> ${flightNumber}</p>
            <p><strong>Airline:</strong> ${flightDetails.airline}</p>
            <p><strong>Departure Airport:</strong> ${flightDetails.departure}</p>
            <p><strong>Arrival Airport:</strong> ${flightDetails.arrival}</p>
            <p><strong>Status:</strong> ${flightDetails.status}</p>
            <p><strong>Departure Time:</strong> ${new Date(flightDetails.departureTime).toLocaleString()}</p>
            <p><strong>Arrival Time:</strong> ${new Date(flightDetails.arrivalTime).toLocaleString()}</p>
        `;
    } else {
        flightInfoDiv.innerHTML = '<p>No flight details found.</p>';
    }
}

// Call the function to fetch and display flight details when the page loads
window.onload = fetchFlightDetails;
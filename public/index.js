document.getElementById('flightSearchByFlightNumberForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const flightNumber = this.flightNumber.value; // Get flight number from input
    const response = await fetch(`/api/flight/${flightNumber}`); // Fetch data from API
    const flightDetails = await response.json(); // Parse JSON response

    const resultsSection = document.getElementById('resultsSection');
    const resultsData = document.getElementById('resultsData');

    if (flightDetails) {
        resultsData.innerHTML = `
            <p><strong>Airline:</strong> ${flightDetails.airline}</p>
            <p><strong>Departure Airport:</strong> ${flightDetails.departure}</p>
            <p><strong>Arrival Airport:</strong> ${flightDetails.arrival}</p>
            <p><strong>Status:</strong> ${flightDetails.status}</p>
            <p><strong>Departure Time:</strong> ${new Date(flightDetails.departureTime).toLocaleString()}</p>
            <p><strong>Arrival Time:</strong> ${new Date(flightDetails.arrivalTime).toLocaleString()}</p>
        `;
        resultsSection.style.display = 'block'; // Show results section
    } else {
        resultsData.innerHTML = '<p>No flight details found.</p>';
        resultsSection.style.display = 'block'; // Show results section
    }
});
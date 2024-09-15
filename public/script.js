document.getElementById('lookupButton').addEventListener('click', function() {
    const flightNumber = document.getElementById('flightNumber').value.toUpperCase();
    fetch(`/api/flight/${flightNumber}`)
        .then(response => response.json())
        .then(data => {
            const detailsDiv = document.getElementById('flightDetails');
            if (data) {
                detailsDiv.innerHTML = `
                    <h2>Flight Details for ${flightNumber}</h2>
                    <p><strong>Airline:</strong> ${data.airline}</p>
                    <p><strong>Departure:</strong> ${data.departure}</p>
                    <p><strong>Arrival:</strong> ${data.arrival}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                    <p><strong>Departure Time:</strong> ${new Date(data.departureTime).toLocaleString()}</p>
                    <p><strong>Arrival Time:</strong> ${new Date(data.arrivalTime).toLocaleString()}</p>
                `;
            } else {
                detailsDiv.innerHTML = `<p>No details found for flight number <strong>${flightNumber}</strong>.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching flight details:', error);
            document.getElementById('flightDetails').innerHTML = `<p>Error fetching flight details. Please try again later.</p>`;
        });
});

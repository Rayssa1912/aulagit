document.addEventListener("DOMContentLoaded", () => {
    const flightList = [];
    const flightListElement = document.getElementById("flightList");
    const bookingStatusElement = document.getElementById("bookingStatus");

    // Add Flight
    document.getElementById("addFlightButton").addEventListener("click", () => {
        const flightNumber = document.getElementById("flightNumber").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const seatsAvailable = parseInt(document.getElementById("seatsAvailable").value.trim());

        if (!flightNumber || !destination || isNaN(seatsAvailable) || seatsAvailable <= 0) {
            alert("Please fill out all fields correctly.");
            return;
        }

        flightList.push({ flightNumber, destination, seatsAvailable });
        updateFlightList();
        clearInputs(["flightNumber", "destination", "seatsAvailable"]);
    });

    // Update Flight List
    function updateFlightList() {
        flightListElement.innerHTML = "";
        flightList.forEach(flight => {
            const listItem = document.createElement("li");
            listItem.textContent = `Flight: ${flight.flightNumber} | Destination: ${flight.destination} | Seats: ${flight.seatsAvailable}`;
            flightListElement.appendChild(listItem);
        });
    }

    // Book Flight
    document.getElementById("bookFlightButton").addEventListener("click", () => {
        const flightNumber = document.getElementById("bookFlightNumber").value.trim();
        const flight = flightList.find(f => f.flightNumber === flightNumber);

        if (!flight) {
            bookingStatusElement.textContent = "Flight not found!";
            bookingStatusElement.style.color = "red";
            return;
        }

        if (flight.seatsAvailable > 0) {
            flight.seatsAvailable -= 1;
            bookingStatusElement.textContent = `Booking successful! Seats left: ${flight.seatsAvailable}`;
            bookingStatusElement.style.color = "green";
            updateFlightList();
        } else {
            bookingStatusElement.textContent = "No seats available!";
            bookingStatusElement.style.color = "red";
        }

        clearInputs(["bookFlightNumber"]);
    });

    // Clear Input Fields
    function clearInputs(inputIds) {
        inputIds.forEach(id => {
            document.getElementById(id).value = "";
        });
    }
});

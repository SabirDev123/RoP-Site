let petrol = 0;
const maxPetrol = 150000;

// Clock + Date (Dhaka)
function updateClock() {
    const now = new Date();

    const dhaka = new Date(
        now.toLocaleString("en-US", {
            timeZone: "Asia/Dhaka"
        })
    );

    const hours = String(dhaka.getHours()).padStart(2, "0");
    const minutes = String(dhaka.getMinutes()).padStart(2, "0");
    const seconds = String(dhaka.getSeconds()).padStart(2, "0");

    document.getElementById("digital-clock").textContent =
        `${hours}:${minutes}:${seconds}`;

    document.getElementById("day-display").textContent =
        dhaka.toLocaleDateString("en-GB", {
            weekday: "long"
        });

    document.getElementById("date-display").textContent =
        dhaka.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    // Analog Clock
    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    document.getElementById("second").style.transform =
        `translateX(-50%) rotate(${secondDeg}deg)`;

    document.getElementById("minute").style.transform =
        `translateX(-50%) rotate(${minuteDeg}deg)`;

    document.getElementById("hour").style.transform =
        `translateX(-50%) rotate(${hourDeg}deg)`;
}

// Fuel Reserve
function updateFuel() {
    if (petrol < maxPetrol) {
        petrol = Math.min(petrol + 0.05, maxPetrol);
    }

    const percent = (petrol / maxPetrol) * 100;

    document.getElementById("fuel-level").style.height =
        percent + "%";

    let state;

    if (petrol >= maxPetrol) {
        state = "Full";
    } else if (petrol >= maxPetrol / 2) {
        state = "More than half full";
    } else {
        state = "Less than half full";
    }

    document.getElementById("petrol-counter").textContent =
        `${petrol.toFixed(2)} Litres (Reserve State: ${state})`;
}

// Initial updates
updateClock();
updateFuel();

// Update clock every second
setInterval(updateClock, 1000);

// Add 0.05 litres every minute
setInterval(updateFuel, 60000);

// Service Worker Registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then((registration) => {
                console.log(
                    "[RoP] Service Worker registered successfully!",
                    registration.scope
                );
            })
            .catch((error) => {
                console.error(
                    "[RoP] Service Worker registration failed:",
                    error
                );
            });
    });
}

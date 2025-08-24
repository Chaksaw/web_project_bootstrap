
// Function to get the user's location and set the Waze map
function initWazeMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Set Waze map source with centered location and pin
            const wazeEmbedUrl = `https://embed.waze.com/iframe?zoom=15&lat=${lat}&lon=${lon}&pin=1`;
            document.getElementById('wazeMap').src = `https://embed.waze.com/iframe?zoom=15&lat=${lat}&lon=${lon}&pin=1`;
        }, function () {
            alert("La géolocalisation a échoué. Veuillez autoriser la géolocalisation pour afficher la carte.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
}

// Initialize map when the page is loaded
$(document).ready(function () {
    initWazeMap();
});
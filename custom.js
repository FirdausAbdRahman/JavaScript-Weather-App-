window.addEventListener("load", () => {
    let long;
    let lat;

    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDescriptionDaily = document.querySelector(".temperature-description-daily");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/407257b02e610cad32eda746e7a0b893/${lat},${long}`;
            
            fetch(api).then(response => {
            return response.json();
            })
            .then(data => {
            console.log(data);

            const {temperature, summary, icon} = data.currently;

            //set DOM elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = "Current Summary: " + summary;
            temperatureDescriptionDaily.textContent = "Prediction: " + data.daily.summary;
            locationTimezone.textContent = data.timezone;

            //Calculation for Celsius
            let celsius = (temperature - 32) * (5/9);

            //set Icon
            setIcons(icon, document.querySelector(".icon"));

            //change temperature to Celsius/Fahrenheit
            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
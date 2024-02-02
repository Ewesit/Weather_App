let isMetric = true; // Default to Celsius

async function getWeather() {
    const apiKey = 'f2bc08aa512e122c1da8494d5d01cf68';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city.');
        return;
    }

    const units = isMetric ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();

    //     if (response.ok) {
    //         displayWeather(data);
    //     } else {
    //         alert(`Error: ${data.message}`);
    //     }
    // } catch (error) {
    //     console.error('Error fetching weather data:', error);
    //     alert('Error fetching weather data.');
    // }
    //======another option to handle errors
    try {
        // Show loading indicator
        document.getElementById('loadingIndicator').style.display = 'block';

        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please enter a valid city.');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
    finally {
        // Hide loading indicator
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}

function displayWeather(data) {
    const temperature = isMetric ? data.main.temp : (data.main.temp * 9/5 + 32).toFixed(2);
    const temperatureUnit = isMetric ? '°C' : '°F';

    const weatherInfoElement = document.getElementById('weatherInfo');
    weatherInfoElement.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

function toggleUnits() {
    isMetric = !isMetric;
    getWeather(); // Re-fetch weather data with the new unit
}
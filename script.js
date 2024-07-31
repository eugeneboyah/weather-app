
        const apiKey = '54c7c9820c3e3d09f2793f28e26b403a';

        // Function to fetch weather data based on city
        async function fetchWeatherData(city) {
            try {
                const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},LR&appid=${apiKey}`);
                const geoData = await geoResponse.json();
                if (geoData.length === 0) {
                    alert('City not found in Liberia.');
                    return;
                }

                const { lat, lon } = geoData[0];
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
                const weatherData = await weatherResponse.json();

                updateWeatherInfo(city, weatherData);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Could not fetch weather data. Please try again later.');
            }
        }

        // Function to update weather information on the page
        function updateWeatherInfo(city, weatherData) {
            document.getElementById('temp').textContent = `${weatherData.main.temp}°C`;
            document.getElementById('city').textContent = city;
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('wind').textContent = `${weatherData.wind.speed} km/h`;

            const weatherIcon = document.getElementById('weather-icon');
            const iconCode = weatherData.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }

        // Event listener for the search button
        document.getElementById('search-button').addEventListener('click', () => {
            const city = document.getElementById('city-input').value.trim();
            if (city) {
                fetchWeatherData(city);
            } else {
                alert('Please enter a city name.');
            }
        });

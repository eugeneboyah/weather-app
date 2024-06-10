const apiKey = '54c7c9820c3e3d09f2793f28e26b403a';

document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},LR&appid=${apiKey}`)
          .then(response => response.json())
          .then(data => {
              if (data.length > 0) {
                  const lat = data[0].lat;
                  const lon = data[0].lon;

                  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                      .then(response => response.json())
                      .then(weather_data => {
                          document.getElementById('temp').textContent = `${weather_data.main.temp}°C`;
                          document.getElementById('city').textContent = city;
                          document.getElementById('humidity').textContent = `${weather_data.main.humidity}%`;
                          document.getElementById('wind').textContent = `${weather_data.wind.speed} km/h`;

                          const weatherIcon = document.getElementById('weather-icon');
                          const iconCode = weather_data.weather[0].icon;
                          weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                      })
                      .catch(err => {
                          console.error('Error fetching weather data:', err);
                          alert('Could not fetch weather data for the specified city.');
                      });
              } else {
                  alert('City not found in Liberia.');
              }
          })
          .catch(err => {
              console.error('Error fetching location data:', err);
              alert('Could not fetch location data for the specified city.');
          });
  } else {
      alert('Please enter a city name.');
  }
});
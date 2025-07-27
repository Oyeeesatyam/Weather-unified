const apiKey = '036223af79b6f819e838625b672ac5b8'; // Your actual OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherDiv = document.getElementById('weatherResult');

  if (!city) {
    weatherDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found or invalid response');
    }
    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherDiv.innerHTML = `
      <h2>${city}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
      <p><strong>${temp}°C</strong></p>
      <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `Error: ${error.message}`;
  }
}

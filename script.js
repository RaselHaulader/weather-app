
  const loadWeather = () => {
    const myKey = "39a9a737b07b4b703e3d1cd1e231eedc";
    const place = document.getElementById('input-field').value;
    document.getElementById('input-field').value = '';
    if (place == '') {
        return
    }
    //make request to url
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${myKey}`)
        .then(response => response.json())
        .then(data => setDisplay(data))
        .catch(error => displayError(error));
  };
  const setDisplay = weather => {
    console.log(weather)
    const weatherBody = document.getElementById('weather-body');
    weatherBody.innerHTML = `
    <hr class="m-0 p-0">
    <div class="d-flex mb-4 justify-content-evenly align-items-center">
        <h2 class="d-inline ms-5">${weather.name}</h2>
        <p class="d-inline p-0 m-0">${calcTime(new Date(weather.timezone/3600))}</p>
    </div>
    <div class="row pb-5">
    <div class="col-5 text-center">
      <h1 class="fs-2">${Math.round(weather.main.temp - 273.15)} &deg;C</h1>
      <p>${weather.weather[0].main}</p>
            <img class="w-50 py-3" src="images/${weather.weather[0].icon}.png" alt="">
            <p><small>${weather.weather[0].description}</small> </p>
    </div>
    <div class="col-7 ps-5 pt-4">
      <p>Sunrise: ${new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</p>
      <p>Sunset: ${new Date(weather.sys.sunset*1000).toLocaleTimeString()}</p>
      <p>Wind: ${weather.wind.speed}</p>
      <p>Humidity: ${weather.main.humidity}%</p>
      <p>Pressure: ${weather.main.pressure}</p>
    </div>
    </div>
    `
  }
  function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return  nd.toLocaleString();
};
const displayError = error => document.getElementById('weather-body').innerHTML = `<p class="text-center fs-5 p-3 text-warning">Sorry This Location Is Not Found</p>`
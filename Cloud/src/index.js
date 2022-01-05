window.addEventListener('DOMContentLoaded', (event) => {
    const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timezone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('current-temp')
const currentTempEl = document.getElementById('current-temp')
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec']
console.log(timeEl)
console.log(dateEl)
const API_KEY = '487b57eb81f63c279aa714573aad9aec'
setInterval(() => {
    const time = new Date();
    const month = time.getMonth()
    const date = time.getDate()
    const Rdate = date < 10 ? "0" + date : date
    const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes()
    const Rminutes = minutes < 10 ? "0" + minutes : minutes
    const ampm = hour >= 12 ? 'PM' : 'AM'
    
    timeEl.innerHTML = hoursIn12HrFormat + ':' + Rminutes + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + Rdate + ' ' + months[month]
}, 1000);
getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        console.log({ latitude, longitude })
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data)
        })
    })
}
getLocationinfo()
function getLocationinfo(){
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        console.log({ latitude, longitude })
        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`).then(res => res.json()).then(loc => {
            console.log(loc)
            timezone.innerHTML = `<div class="time-zone" id="time-zone">${loc[0].name},${loc[0].state}</div>`
            countryEl.innerHTML = `<div id="country" class="country">${loc[0].country}</div>`
        })
    })
}
function showWeatherData(data) {
    let { humidity, pressure, clouds, wind_speed } = data.current
    currentWeatherItemsEl.innerHTML = ` <div class="weather-item">
                                        <div>Clouds</div>
                                        <div>${clouds}</div>
                                        </div>
                                        <div class="weather-item">
                                        <div>Humidity</div>
                                        <div>${humidity}</div>
                                        </div>
                                         <div class="weather-item">
                                        <div>Pressure</div>
                                        <div>${pressure}</div>
                                        </div>
                                         <div class="weather-item">
                                        <div>Wind Speed</div>
                                        <div>${wind_speed}</div>
                                        </div>
                                        
                                        `

    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        // if(idx === 0){
        //         // currentTempEl.innerHTML = `
            
        //         // <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
        //         // <div class="other">
        //         //     <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        //         //     <div class="temp">Night - ${day.temp.night}&#176; C</div>
        //         //     <div class="temp">Day - ${day.temp.day}&#176; C</div>
        //         // </div>
            
        //         // `
        //  }else{
            otherDayForcast += `
             <div class="weather-forecast-item">
                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="w-icon">
                 <div class="temp">Night - ${day.temp.night}&#176; C</div> 
                 <div class="temp">Day - ${day.temp.day}&#176; C</div> 
                <p class="space"></p>
             </div>
        
             `
        //  }
     })
     weatherForecastEl.innerHTML = otherDayForcast
}
});




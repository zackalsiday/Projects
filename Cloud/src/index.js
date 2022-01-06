// import curentWeatherData from './scripts/currentWeatherData.js'

window.addEventListener('DOMContentLoaded', (event) => {
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timezone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('current-temp')
const currentTempEl = document.getElementById('current-temp')
const mapsweather = document.getElementById('map')
const location = document.getElementById('searchbutton')
    location.addEventListener("mouseup", (e) => {
        findLocation();
    })
const layers = document.getElementById('layer')
    layers.addEventListener("mouseup", (e) => {
        updateLayer('layer');
    })
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
//////////////////
    const application = {
        name: 'OpenWeatherMap API',
        version: '1.0'
    }

    const tomTom = {
        key: 'WpMzzQ2elVeYp6MdFuVFePFYNiUgA06L',
        mapPadding: 40,
        map: null,
        popup: null,
        searchZoom: 11
    };

    const openWeatherMap = {
        appid: '487b57eb81f63c279aa714573aad9aec',
        tileUrl: 'https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={appid}',
        layer: '',
        layerName: 'owm_layer',
        sourceName: 'owm_source',
        attribution: 'OpenWeatherMap.org',
        units: 'imperial',
        directions: [
            'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
        ],
        maxDegree: 360
    };

    const ids = {
        html: {
            map: 'map',
            location: 'location',
            imperial: 'imperial',
            metric: 'metric'
        }
    };

    init();

    function appendHeading(element, text) {
        const h3 = document.createElement('H3');
        h3.appendChild(document.createTextNode(text));
        element.appendChild(h3);
    }

    function appendIcon(element, icon) {
        const img = document.createElement('IMG');
        img.src = 'http://openweathermap.org/img/wn/' + icon + '.png';
        element.appendChild(img);
    }

    function appendLine(element, text, withoutBreak) {
        element.appendChild(document.createTextNode(text));
        if (!withoutBreak)
            element.appendChild(document.createElement('BR'));
    }

    function centerAndZoom(response) {
        const location = getLocation(response);
        if (location != null)
            tomTom.map.flyTo({ center: location.position, zoom: tomTom.searchZoom });
    }

    function clearLayer() {
        if (tomTom.map.getLayer(openWeatherMap.layerName))
            tomTom.map.removeLayer(openWeatherMap.layerName);

        if (tomTom.map.getSource(openWeatherMap.sourceName))
            tomTom.map.removeSource(openWeatherMap.sourceName);
    }

    function displayPopup(response, location) {
        if (!tomTom.map.loaded())
            return;

        clearPopup();

        if (response.hasOwnProperty('cod') && response.hasOwnProperty('message')) {
            alert('Error: ' + response.message);
            return;
        }

        tomTom.popup = new tt.Popup({ maxWidth: 'none' })
            .setLngLat(location)
            .setDOMContent(formatText(response))
            .addTo(tomTom.map);
    }

    function clearPopup() {
        if (tomTom.popup == null)
            return;

        tomTom.popup.remove();
        tomTom.popup = null;
    }

    function findLocation() {
        if (!tomTom.map.loaded()) {
            alert('Please try again later, map is still loading.');
            return;
        }

        clearPopup();

        const queryText = getValue(ids.html.location);

        tt.services.fuzzySearch({ key: tomTom.key, query: queryText })
            .go()
            .then(centerAndZoom)
            .catch(function (error) {
                alert('Could not find location (' + queryText + '). ' + error.message);
            });
    }

    function formatText(response) {
        const weather = response.weather[0];
        const tempUnits = openWeatherMap.units == 'imperial' ? '℉' : '℃';
        const temp = Math.round(response.main.temp);

        const outerDiv = document.createElement('DIV');
        outerDiv.classList.add('popup');

        appendIcon(outerDiv, weather.icon);
        appendHeading(outerDiv, getName(response));

        const innerDiv = document.createElement('DIV');
        outerDiv.appendChild(innerDiv);

        appendLine(innerDiv, weather.description);
        appendLine(innerDiv, 'Temperature: ' + temp + ' ' + tempUnits);
        appendLine(innerDiv, 'Humidity: ' + response.main.humidity + '%');
        appendLine(innerDiv, 'Wind Speed: ' + formatWind(response.wind), true);
        return outerDiv;
    }

    function formatWind(wind) {
        const units = openWeatherMap.units == 'imperial' ? 'mph' : 'km/h';
        const speed = Math.round(wind.speed) + ' ' + units;
        const direction = getDirection(wind.deg);
        return direction == null ? speed : direction + ' ' + speed;
    }

    function getCurrentWeatherData(clickEvent) {
        currentWeatherData({
            appid: openWeatherMap.appid,
            lat: clickEvent.lngLat.lat,
            lon: clickEvent.lngLat.lng,
            units: openWeatherMap.units
        })
            .go()
            .then(function (response) {
                displayPopup(response, clickEvent.lngLat);
            })
            .catch(function (error) {
                clearPopup();

                const message = error.hasOwnProperty('message') ? error.message : error;
                alert('Error: ' + message);
            });
    }

    function getDirection(degrees) {
        const increment = openWeatherMap.maxDegree / openWeatherMap.directions.length;
        return degrees >= 0 && degrees < openWeatherMap.maxDegree ?
            openWeatherMap.directions[Math.floor(degrees / increment)] : null;
    }

    function getLocation(response) {
        if (response.results.length > 0)
            return response.results[0];

        alert('Could not find location.');
        return null;
    }

    function getName(response) {
        const name = response.hasOwnProperty('name') ? response.name : '';
        return name == null || name == '' ?
            'lat=' + response.coord.lat + ', lon=' + response.coord.lon : name;
    }

    function getValue(elementId) {
        return document.getElementById(elementId).value;
    }

    function init() {
        tt.setProductInfo(application.name, application.version);

        tomTom.map = tt.map({ key: tomTom.key, container: ids.html.map })
            .on('click', getCurrentWeatherData);
    }

    function updateLayer(element) {
        openWeatherMap.layer = element.options[element.selectedIndex].value;

        if (!tomTom.map.loaded())
            return;

        clearLayer();
        clearPopup();

        const tileUrl = openWeatherMap.tileUrl
            .replace('{layer}', openWeatherMap.layer)
            .replace('{appid}', openWeatherMap.appid);

        tomTom.map.addSource(openWeatherMap.sourceName, {
            type: 'raster',
            tiles: [tileUrl],
            tileSize: 256,
            minZoom: 0,
            maxZoom: 12,
            attribution: openWeatherMap.attribution
        });

        tomTom.map.addLayer({
            'id': openWeatherMap.layerName,
            'type': 'raster',
            'source': openWeatherMap.sourceName,
            'layout': { 'visibility': 'visible' }
        });
    }

    function updateUnits(element) {
        openWeatherMap.units = element.value;

        if (tomTom.map.loaded())
            clearPopup();
    }
////////////////////////////////////////////


    function CurrentWeatherDataOptions(options) {
        this.options = options;

        if (!options.hasOwnProperty('url'))
            options.url = 'https://api.openweathermap.org/data/2.5/weather';
    }

    CurrentWeatherDataOptions.prototype.go = function () {
        const options = this.options;

        return new Promise(function (fulfill, reject) {
            if (!formatLocationUrl(options)) {
                reject('currentWeatherData call is invalid.');
                return;
            }

            fetchResponse(options, fulfill, reject);
        });

        function addOptionalParameter(options, name) {
            if (options.hasOwnProperty(name))
                addParameter(options, name);
        }

        function addParameter(options, name, value) {
            options.url += options.hasParameters ? '&' : '?';
            options.url += name + '=' + encodeURIComponent(value || options[name]);
            options.hasParameters = true;
        }

        function fetchResponse(options, fulfill, reject) {
            fetch(options.url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin'
            })
                .then(function (response) {
                    parseResponse(response, fulfill, reject);
                })
                .catch(function (error) {
                    reject(error);
                });
        }

        function formatLocationUrl(options) {
            if (!hasOwnProperties(options, ['appid', 'lat', 'lon']))
                return false;

            addParameter(options, 'lat', options.lat);
            addParameter(options, 'lon', options.lon);
            addOptionalParameter(options, 'units');
            addParameter(options, 'appid');
            return true;
        }

        function hasOwnProperties(options, properties) {
            if (options == null)
                return false;

            for (const property of properties)
                if (!options.hasOwnProperty(property))
                    return false;

            return true;
        }

        function parseResponse(response, fulfill, reject) {
            response
                .json()
                .then(function (obj) {
                    if (!obj.hasOwnProperty('error'))
                        fulfill(obj);
                    else
                        reject(obj.error.description);
                })
                .catch(function (error) {
                    reject(error);
                });
        }
    }

    function currentWeatherData(options) {
        return new CurrentWeatherDataOptions(options);
    }

})





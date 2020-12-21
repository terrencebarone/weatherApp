async function getWeather(city){
    fetch( `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=imperial`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "bb6cce004amsh05feb37a267385ap1036a6jsnfc8b440c15fb",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        noCity(city);
    });
   
  
}

//searches input and search weather is clicked
window.onload = function(){
    document.getElementById("search-weather-button").addEventListener('click', ()=>{
        let city=document.getElementById("city-input").value;
        getWeather(city);
    })
}

//returns message that no city is found
function noCity(city){
    let header = document.getElementById("header");
    let message = `<p id="message">${city} Could Not Be Found</p>`;
    if(header.lastChild.id==='message'){
        document.getElementById('message').innerText=`${city} Could Not Be Found`;
    }
    else{
        header.insertAdjacentHTML('beforeend',message);
    }
    document.getElementById('weather-result').innerHTML='';
}

function checkNotFoundMessage(){
      //checks to see if noCity message is there 
      
      let header = document.getElementById("header");
      if(header.lastChild.id==='message'){
          header.removeChild(header.lastChild);
      }
      
}


//displays weather on HTML
function displayWeather(data){
    //displays current temp and image of weather
    let icon= data.weather[0].icon;
    icon="http://openweathermap.org/img/w/"+icon+".png";
    document.getElementById("weather-result").innerHTML =
    `
    <h1 class="city-country">${data.name}, ${data.sys.country}</h1>
    <p class="img-desc">${data.weather[0].main}</p>
    <div id="temp-flex">
        <h1 class="temp">${data.main.temp}</h1>
        <img class="img" src=${icon}>
    </div>
    <p onclick="showMore()" id="more-details">More Details</p>
    <div id="details">
        <p class="more-info">Feels like: ${data.main.feels_like}</p>
        <p class="more-info">High: ${data.main.temp_max}</p>
        <p class="more-info">Low: ${data.main.temp_min}</p>
        <p class="more-info">Humidity: ${data.main.humidity}</p>
    </div>
    <p onclick="showLess()" id="less-details">Less Details</p>
    `;
    checkNotFoundMessage();
}

function showMore(){
    document.getElementById("details").style.display="block";
    document.getElementById('more-details').style.display="none";
    document.getElementById("less-details").style.display="block";
}
function showLess(){
    document.getElementById("details").style.display="none";
    document.getElementById('more-details').style.display="block";
    document.getElementById("less-details").style.display="none";
}




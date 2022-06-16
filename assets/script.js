var searchForm = document.querySelector('#searchForm');
var searchFormInput = document.querySelector('#searchFormInput');
var currentCity = document.querySelector('#currentCity');
var fiveDays = document.querySelector('.five-days');
var APIKey="a0aca8a89948154a4182dcecc780b513";

var getCity = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
    
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);

            var cityName = document.createElement("h1");
            cityName.innerHTML = (data.name);

            var date = document.createElement("h2");
            date.innerHTML = moment().format("ddd MMM Do, YYYY");

            var temp = document.createElement("p");
            temp.innerHTML = 'Temp: ' + (data.main.temp) + "deg";
            temp.classList = ("weather-condition")

            var wind = document.createElement("p");
            wind.innerHTML = 'Wind: ' + (data.main.speed) + "mph";
            wind.classList = ("weather-condition");
            
            var humidity = document.createElement("p");
            humidity.innerHTML = 'Humidity: ' + (data.main.humidity);
            humidity.classList = ("weather-condition");

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var futureUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}';

            fetch(futureUrl).then(function (response) {
                response.json().then(function (data) {
                    var uvi = document.createElement("p");
                    uvi.innerHTML = 'UVIndex: ' + (data.current.uvi);
                    uvi.classList = ('');
                    currentCity.append(cityName, data, humidity, temp, wind);

                    fiveDays(data.daily);
                })
            });
        });
    });
};

function forecast(cityid){
    var dayover= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconurl+">");
            $("#fTemp"+i).html(tempF+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
        }
        
    });
}
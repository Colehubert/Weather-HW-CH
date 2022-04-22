function weatherBalloon( cityID ) {
    var key = 'b63126df33e6cec8898029aa99f5fc0f';
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      var name = data[0].name
      var latitude = data[0].lat
      var longitude = data[0].lon
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=' + key)
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        console.log(data);
        addHistory(name)
        var date = data.current.dt*1000
       var datestring = (new Intl.DateTimeFormat('default', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        }).format(date))
        document.getElementById("current-title").innerHTML = name+" ("+ datestring+ ")"
        var temp = data.current.temp
        temp = 1.8*(temp-273)+32
        temp = temp.toFixed(2)+"° F"
        var humidity = data.current.humidity
        var wind = data.current.wind_speed
        var uv = data.current.uvi
    document.getElementById("current-info").innerHTML = "Temp: "+temp+ "<br><br>Humidity: "+humidity+ "<br><br>Wind Speed: "+wind+" MPH<br><br>UV Index: "+uv+"<br><br>"
      })
     
    })
   
  }
  weatherBalloon("Chicago");
  document.getElementById("search-button").addEventListener("click",function(){
    weatherBalloon(document.getElementById("search-input").value)
  })
  function addHistory(cityname){
    var div = document.createElement("div")
    div.innerHTML = cityname
    document.getElementById("search-history").prepend(div)
  }
window.addEventListener("load", function () {
  //Click event
  //document.getElementById()

  let searchBtn = document.getElementById("search");
  let text = document.getElementById("searchfield");
  let contentArea = document.getElementById("contentArea");
  let p = document.createElement("p");
  p.textContent = "Enter the city name to get relevant weather data";
  document.querySelector(".col-4").prepend(p);
  const FIVEDAYFORECAST_VALUE = 5;

  let forecastTitle = document.createElement("h3");
  forecastTitle.innerHTML = "FIVE DAY FORECAST";
  forecastTitle.style = "margin-top:2rem;margin-bottom:1rem;";
  //document.querySelector(".card").append(forecastTitle);

  document
    .querySelector("#contentArea")
    .insertBefore(forecastTitle, document.querySelector(".forecast"));

  function hasClass(elem, className) {
    return elem.className.split(" ").indexOf(className) > -1;
  }

  document.addEventListener("click", e => {
    if (hasClass(e.target, "list-group-item")) {
      console.log(e.target.id);
      let cityname = e.target.id.split("weather")[0];
      console.log(cityname);
      let weatherData = JSON.parse(window.localStorage.getItem(`${cityname}`));
      console.log(weatherData);

      //let latitude = data.coord.lat;
      //let longitude = data.coord.lon;
      let currentTempCelsius = Math.round(weatherData.currentWeather.temp); //- 273.15
      let currentFeelsLike = Math.trunc(weatherData.currentWeather.feelsLike);
      let currentPressure = weatherData.currentWeather.pressure;
      let currentHumidity = weatherData.currentWeather.humidity;
      //city.currentWeather.temp = currentTempCelsius;

      //console.log(data);
      //contentArea.innerHTML = JSON.stringify(data)
      document.querySelector(".card-title").innerHTML = cityname;
      /*document
          .querySelector("#icon")
          .setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
          );*/

      document.querySelector(
        "#temp-subtitle"
      ).innerHTML = `${currentTempCelsius}&#176c`;
      //feels like
      document.querySelector(
        "#feelsLike-subtitle"
      ).innerHTML = `${currentFeelsLike}&#176c`;
      //city.currentWeather.feelsLike = currentFeelsLike;
      //pressure
      document.querySelector("#pressure-subtitle").innerHTML = currentPressure;
      //city.currentWeather.pressure = currentPressure;
      //Humidity
      document.querySelector(
        "#humidity-subtitle"
      ).innerHTML = `${currentHumidity}%`;
      //city.currentWeather.humidity = currentHumidity;

      document.querySelector(".forecast").classList.add("clearfix");

      if (document.querySelector(".forecast").childNodes.length !== 0) {
        document.querySelector(".forecast").innerHTML = "";
      }

      let card = [];

      let h6FeelsLikeForecast = [];
      let h6PressureForecast = [];
      let h6HumidityForecast = [];
      let forecastIcons = [];
      let forecastDate = [];
      let forecastTemp = [];

      let tempForecast;
      let feelsLikeForecast;
      let pressureForecast;
      let spansLength;

      let spanFeelsLike = [];
      let spanPressure = [];
      let spanHumidity = [];

      for (let k = 0; k < FIVEDAYFORECAST_VALUE; k++) {
        card.push(null);
        h6FeelsLikeForecast.push(null);
        h6PressureForecast.push(null);
        h6HumidityForecast.push(null);
        forecastDate.push(null);
        forecastIcons.push(null);
        forecastTemp.push(null);
      }

      for (let j = 0; j < FIVEDAYFORECAST_VALUE; j++) {
        spanFeelsLike.push({ label: null, value: null });
        spanPressure.push({ label: null, value: null });
        spanHumidity.push({ label: null, value: null });
      }

      for (let i = 0; i < FIVEDAYFORECAST_VALUE; i++) {
        tempForecast = weatherData.fivedayforecast[i].temp;

        feelsLikeForecast = weatherData.fivedayforecast[i].feelsLike;
        //console.log(feelsLikeForecast);
        pressureForecast = weatherData.fivedayforecast[i].pressure;
        //console.log(pressureForecast);
        humidityForecast = weatherData.fivedayforecast[i].humidity;
        //console.log(humidityForecast);
        card[i] = document.createElement("div");
        card[i].classList.add("card-body");
        card[i].classList.add("float-left");

        i === 0
          ? card[i].classList.add("forecast-info")
          : card[i].classList.add(`forecast-info${i + 1}`);
        //card.setAttribute('id','forecast-info')
        document.querySelector(".forecast").append(card[i]);

        if (i === 0) {
          document.querySelector(".forecast-info").style =
            "border:0.1rem solid grey";
          //document.querySelector(".forecast-info").style.float = "left";
        } else {
          document.querySelector(`.forecast-info${i + 1}`).style =
            "border:0.1rem solid grey";
        }

        forecastDate[i] = document.createElement("h4");

        switch (i) {
          case 0:
            forecastDate[0].innerHTML = "Tommorow";

            break;
          case 1:
            forecastDate[1].innerHTML = "Day after";
            //forecastDate[1].innerHTML ="Tommorow";
            break;
          default:
            //i+1
            //console.log(data);
            forecastDate[i].innerHTML = weatherData.fivedayforecast[i].date;

          //forecastDate[i].innerHTML = utcDate;
        }

        card[i].appendChild(forecastDate[i]);

        forecastIcons[i] = document.createElement("img");
        forecastIcons[i].classList.add(`forecastweather${i + 1}`);
        forecastIcons[i].setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${weatherData.fivedayforecast[i].icon}.png`
        );
        card[i].appendChild(forecastIcons[i]);

        forecastTemp[i] = document.createElement("h3");
        forecastTemp[i].className = "card-subtitle mb-2 text-muted";
        forecastTemp[i].innerHTML = `${tempForecast}&#176c`;

        card[i].appendChild(forecastTemp[i]);

        /*forecastIcons[i] = document.createElement("img");
        forecastIcons[i].classList.add(`forecastweather${i + 1}`);
        card[i].appendChild(forecastIcons[i]);

        forecastIcons[i].setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}.png`
        );*/

        h6FeelsLikeForecast[i] = document.createElement("h6");
        card[i].append(h6FeelsLikeForecast[i]);

        spanFeelsLike[i].label = document.createElement("span");
        spanFeelsLike[i].label.textContent = "Feels Like:";
        h6FeelsLikeForecast[i].appendChild(spanFeelsLike[i].label);

        spanFeelsLike[i].value = document.createElement("span");
        spanFeelsLike[i].value.innerHTML = `${feelsLikeForecast}&#176c`;
        h6FeelsLikeForecast[i].appendChild(spanFeelsLike[i].value);

        //city.fivedayforecast[i].feelsLike = feelsLikeAvg;

        h6PressureForecast[i] = document.createElement("h6");
        card[i].append(h6PressureForecast[i]);
        spanPressure[i].label = document.createElement("span");
        spanPressure[i].label.textContent = "Pressure:";
        h6PressureForecast[i].appendChild(spanPressure[i].label);

        spanPressure[i].value = document.createElement("span");
        spanPressure[i].value.innerHTML = `${pressureForecast}kPa`;
        h6PressureForecast[i].appendChild(spanPressure[i].value);
        //city.fivedayforecast[i].pressure = data.daily[i].pressure;

        h6HumidityForecast[i] = document.createElement("h6");
        card[i].append(h6HumidityForecast[i]);

        spanHumidity[i].label = document.createElement("span");
        spanHumidity[i].label.textContent = "Humidity:";
        h6HumidityForecast[i].appendChild(spanHumidity[i].label);

        spanHumidity[i].value = document.createElement("span");
        spanHumidity[i].value.innerHTML = `${humidityForecast}%`;
        h6HumidityForecast[i].appendChild(spanHumidity[i].value);
      }
    }
  });

  function displayData(historyItem, index) {
    console.log(historyItems);

    console.log("In display data");
    console.log(historyItem.textContent);
  }

  //new function here
  function dataStructure(data) {
    let keys = Object.keys(data);
    //data is server API
    // keys  = ["currentWeather", "1", "2", "3"]
    let city = {};
    for (let i = 0; i < keys.length; i++) {
      //city = {data[keys[i]]}

      city[keys[i]] = data[keys[i]];
    }

    return city;
  }

  function displayCurrentWeather(
    city,
    iconType,
    currentTemp,
    currentFeelsLike,
    currentPressure,
    currentHumidity
  ) {
    document.querySelector(".card-title").innerHTML = city;
    document
      .querySelector("#icon")
      .setAttribute("src", `https://openweathermap.org/img/wn/${iconType}.png`);
    document.querySelector("#temp-subtitle").innerHTML = `${currentTemp}&#176c`;
    //feels like
    document.querySelector(
      "#feelsLike-subtitle"
    ).innerHTML = `${currentFeelsLike}&#176c`;
    //pressure
    document.querySelector("#pressure-subtitle").innerHTML = currentPressure;
    //Humidity
    document.querySelector(
      "#humidity-subtitle"
    ).innerHTML = `${currentHumidity}%`;
  }

  function displayForecast(
    forecastDateArr,
    forecastDateFormattedArr,
    weatherIconArr,
    forecastDateArr,
    forecastTempArr,
    forecastHeaderFeelsLikeArr,
    forecastFeelsLikeArr,
    forecastHeaderPressureArr,
    forecastPressureArr,
    forecastHeaderHumidityArr,
    forecastHumidityArr,
    cardParentArr,
    index,
    monthStrArr,
    weatherData,
    clickedOnSearchBtn
  ) {
    let temp = [];
    let feelsLike = [];

    for (let n = 0; n < FIVEDAYFORECAST_VALUE; n++) {
      if (clickedOnSearchBtn) {
        temp.push(
          Math.round(
            (data.daily[n].temp.day +
              data.daily[n].temp.night +
              data.daily[n].temp.eve +
              data.daily[n].temp.morn) /
              4
          )
        );

        feelsLike.push(
          Math.round(
            (data.daily[n].feels_like.day +
              data.daily[n].feels_like.night +
              data.daily[n].feels_like.eve +
              data.daily[n].feels_like.morn) /
              4
          )
        );

        dateData = data.daily[n + 1].dt;
        utcDate = new Date(dateData * 1000);
        monthNum = utcDate.getUTCMonth();
        //console.log("Month is " + monthNum);
        forecastDateArr[n] = utcDate.getUTCDate();
        monthStrArr[n] = getMonthStr(monthNum);
        forecastDateFormattedArr[n] = `${monthStrArr[n]} ${forecastDateArr[n]}`;
      } else {
        temp.push(weatherData.fivedayforecast[n].temp);
        feelsLike.push(weatherData.fivedayforecast[n].feelsLike);
      }

      //switch(i>1){
      //fetch the date data from object
      //let dateData = data.daily[i + 1].dt;
      //Multiply by 1000 from dateData to get UTC date
      //let utcDate = new Date(dateData * 1000);
      //find the num for the month of year(0-11)
      //let monthNum = utcDate.getUTCMonth();

      //let monthStr = null;
      //console.log("Month is " + monthNum);
      //let date = utcDate.getUTCDate();

      //monthStr = getMonthStr(monthNum);

      //let dateFormatted = monthStr + " " + date;
      //}
    }

    for (let i = 0; i < FIVEDAYFORECAST_VALUE; i++) {
      forecastIcons[i] = document.createElement("img");
      forecastIcons[i].classList.add(`forecastweather${i + 1}`);
      card[i].appendChild(forecastIcons[i]);
      forecastIcons[i].setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
      );
      forecastHeaderFeelsLikeArr[i] = document.createElement("h6");
      card[i].append(forecastHeaderFeelsLikeArr[i]);
      forecastHeaderFeelsLikeArr[i].appendChild(spanFeelsLike[i].label);
      forecastHeaderFeelsLikeArr[i].appendChild(spanFeelsLike[i].value);

      //forecastHeaderPressureArr
      forecastHeaderPressureArr[i] = document.createElement("h6");
      card[i].append(h6PressureForecast[i]);
      createAndDisplayLabelSpan(spanPressure, i, "Pressure");
      forecastHeaderPressureArr[i].appendChild(spanPressure[i].label);
      createAndDisplayValueSpan(
        spanPressure,
        i,
        `${weatherData.daily[i].pressure} kPa`
      );
      forecastHeaderPressureArr[i].appendChild(spanPressure[i].value);
      forecastHeaderHumidityArr[i] = document.createElement("h6");
      card[i].append(forecastHeaderHumidityArr[i]);
      createAndDisplayLabelSpan(spanHumidity, i, "Humidity");
      forecastHeaderHumidityArr[i].appendChild(spanHumidity[i].label);
      createAndDisplayValueSpan(spanHumidity, i, weatherData.daily[i].humidity);
      forecastHeaderHumidityArr[i].appendChild(spanHumidity[i].value);
    }
  }

  function createAndDisplayLabelSpan(arr, index, labelText) {
    arr[index].label = document.createElement("span");
    arr[index].label.textContent = labelText;
  }

  function createAndDisplayValueSpan(arr, index, displayValue) {
    arr[index].value = document.createElement("span");
    arr[index].value.innerHTML = displayValue;
  }

  function getMonthStr(monthVal) {
    let str = "";
    switch (monthVal) {
      case 0:
        str = "January";
        break;
      case 1:
        str = "February";
        break;
      case 2:
        str = "March";
        break;
      case 3:
        str = "April";
        break;
      case 4:
        str = "May";
        break;
      case 5:
        str = "June";
        break;
      case 6:
        str = "July";
        break;
      case 7:
        str = "September";
        break;
      case 8:
        str = "October";
        break;
      case 9:
        str = "November";
        break;
      case 10:
        str = "December";
        break;
    }
    return str;
  }
  searchBtn.addEventListener("click", () => {
    console.log("hello!");
    let cityname = text.value;
    let cityWeather = {
      currentWeather: {
        temp: null,
        icon: null,
        feelsLike: null,
        pressure: null,
        humidity: null
      },
      fivedayforecast: {
        0: {
          date: null,
          icon: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null
        },
        1: {
          date: null,
          icon: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null
        },
        2: {
          date: null,
          icon: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null
        },
        3: {
          date: null,
          icon: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null
        },
        4: {
          date: null,
          icon: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null
        }
      }
    };

    //null;
    /*
        let keys = Object.keys(data);
        data is server API
        // keys  = ["currentWeather", "1", "2", "3"]

        for(let i=0; i < keys.length;i++){
            city = {data[keys[i]]}

            city = {
                    //key: value
                    keys[i] :data[keys[i]] 

            }

        }
*/
    var lat = 0;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=986904ce0aedb0d8127d740bf0c74682`
    )
      .then(response => response.json())
      .then(data => {
        //data.name;
        // data.weather[0].icon;

        let latitude = data.coord.lat;
        let longitude = data.coord.lon;

        displayCurrentWeather(
          data.name,
          data.weather[0].icon,
          Math.round(data.main.temp),
          Math.trunc(data.main.feels_like),
          data.main.pressure,
          data.main.humidity
        );

        cityWeather.currentWeather.temp = Math.round(data.main.temp);
        cityWeather.currentWeather.feelsLike = Math.trunc(data.main.feels_like);
        cityWeather.currentWeather.pressure = data.main.pressure;
        cityWeather.currentWeather.humidity = data.main.humidity;

        document.querySelector(".forecast").classList.add("clearfix");
        if (document.querySelector(".forecast").childNodes.length !== 0) {
          document.querySelector(".forecast").innerHTML = "";
        }

        console.log(cityWeather);

        /*Work on storing five day forecast now*/
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=986904ce0aedb0d8127d740bf0c74682`
        )
          .then(response => response.json())
          .then(data => {
            let card = [];

            let h4ForecastDate = [];
            let imgForecastIcons = [];
            let h3ForecastTemp = [];
            let h6ForecastFeelsLike = [];
            let h6ForecastPressure = [];
            let h6ForecastHumidity = [];

            let dateData = null;
            // data.daily[i + 1].dt;
            let utcDate = null;
            //new Date(dateData * 1000);
            let monthNum = null;
            //utcDate.getUTCMonth();
            let monthStr = [];
            //console.log("Month is " + monthNum);
            let date = [];
            //utcDate.getUTCDate();
            let dateFormatted = [];

            let tempAvg = [];
            let feelsLikeAvg = [];

            let spanFeelsLike = [];
            let spanPressure = [];
            let spanHumidity = [];

            for (let k = 0; k < FIVEDAYFORECAST_VALUE; k++) {
              card.push(null);
              h4ForecastDate.push(null);
              imgForecastIcons.push(null);
              h3ForecastTemp.push(null);
              h6ForecastFeelsLike.push(null);
              h6ForecastPressure.push(null);
              h6ForecastHumidity.push(null);
            }

            for (let j = 0; j < FIVEDAYFORECAST_VALUE; j++) {
              spanFeelsLike.push({ label: null, value: null });
              spanPressure.push({ label: null, value: null });
              spanHumidity.push({ label: null, value: null });
            }
            /* */

            for (let n = 0; n < FIVEDAYFORECAST_VALUE; n++) {
              tempAvg.push(
                Math.round(
                  (data.daily[n].temp.day +
                    data.daily[n].temp.night +
                    data.daily[n].temp.eve +
                    data.daily[n].temp.morn) /
                    4
                )
              );

              feelsLikeAvg.push(
                Math.round(
                  (data.daily[n].feels_like.day +
                    data.daily[n].feels_like.night +
                    data.daily[n].feels_like.eve +
                    data.daily[n].feels_like.morn) /
                    4
                )
              );

              dateData = data.daily[n + 1].dt;
              utcDate = new Date(dateData * 1000);
              monthNum = utcDate.getUTCMonth();
              //console.log("Month is " + monthNum);
              date[n] = utcDate.getUTCDate();
              monthStr[n] = getMonthStr(monthNum);
              dateFormatted[n] = `${monthStr[n]} ${date[n]}`;
            }

            for (let i = 0; i < FIVEDAYFORECAST_VALUE; i++) {
              card[i] = document.createElement("div");

              card[i].classList.add("card-body");
              card[i].classList.add("float-left");

              i === 0
                ? card[i].classList.add("forecast-info")
                : card[i].classList.add(`forecast-info${i + 1}`);

              //card.setAttribute('id','forecast-info')
              document.querySelector(".forecast").append(card[i]);

              if (i === 0) {
                document.querySelector(".forecast-info").style =
                  "border:0.1rem solid grey";
              } else {
                document.querySelector(`.forecast-info${i + 1}`).style =
                  "border:0.1rem solid grey";
              }

              h4ForecastDate[i] = document.createElement("h4");

              switch (i) {
                case 0:
                  h4ForecastDate[0].innerHTML = "Tommorow";

                  break;
                case 1:
                  h4ForecastDate[1].innerHTML = "Day after";
                  //forecastDate[1].innerHTML ="Tommorow";
                  break;
                default:
                  //i+1
                  h4ForecastDate[i].innerHTML = dateFormatted[i];
              }

              card[i].appendChild(h4ForecastDate[i]);

              /*displayForecast(
                forecastIcons,
                h6FeelsLikeForecast,
                spanFeelsLike,
                h6PressureForecast,
                spanPressure,
                h6HumidityForecast,
                spanHumidity,
                card,
                i,
                data
              );*/

              imgForecastIcons[i] = document.createElement("img");
              imgForecastIcons[i].classList.add(`forecastweather${i + 1}`);
              imgForecastIcons[i].setAttribute(
                "src",
                `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
              );
              card[i].appendChild(imgForecastIcons[i]);

              h3ForecastTemp[i] = document.createElement("h3");
              h3ForecastTemp[i].className = "card-subtitle mb-2 text-muted";
              h3ForecastTemp[i].innerHTML = `${tempAvg[i]}&#176c`;
              card[i].appendChild(h3ForecastTemp[i]);

              h6ForecastFeelsLike[i] = document.createElement("h6");
              card[i].append(h6ForecastFeelsLike[i]);

              spanFeelsLike[i].label = document.createElement("span");
              spanFeelsLike[i].label.textContent = "Feels Like:";
              h6ForecastFeelsLike[i].appendChild(spanFeelsLike[i].label);

              spanFeelsLike[i].value = document.createElement("span");
              spanFeelsLike[i].value.innerHTML = `${feelsLikeAvg[i]}&#176c`;
              h6ForecastFeelsLike[i].appendChild(spanFeelsLike[i].value);

              h6ForecastPressure[i] = document.createElement("h6");
              card[i].append(h6ForecastPressure[i]);
              spanPressure[i].label = document.createElement("span");
              spanPressure[i].label.textContent = "Pressure:";
              h6ForecastPressure[i].appendChild(spanPressure[i].label);

              spanPressure[i].value = document.createElement("span");
              spanPressure[i].value.innerHTML = `${data.daily[i].pressure}kPa`;
              h6ForecastPressure[i].appendChild(spanPressure[i].value);

              h6ForecastHumidity[i] = document.createElement("h6");
              card[i].append(h6ForecastHumidity[i]);

              spanHumidity[i].label = document.createElement("span");
              spanHumidity[i].label.textContent = "Humidity:";
              h6ForecastHumidity[i].appendChild(spanHumidity[i].label);

              spanHumidity[i].value = document.createElement("span");
              spanHumidity[i].value.innerHTML = `${data.daily[i].humidity}%`;
              h6ForecastHumidity[i].appendChild(spanHumidity[i].value);

              cityWeather.fivedayforecast[i].date = dateFormatted[i];
              cityWeather.fivedayforecast[i].icon =
                data.daily[i].weather[0].icon;
              cityWeather.fivedayforecast[i].temp = tempAvg[i];
              cityWeather.fivedayforecast[i].feelsLike = feelsLikeAvg[i];
              cityWeather.fivedayforecast[i].pressure = data.daily[i].pressure;
              cityWeather.fivedayforecast[i].humidity = data.daily[i].humidity;
            }
            document.querySelector(".forecast").style.display = "inline-block";
            document.querySelector(".forecast").style.width = "100%";
            //li.value
            this.window.localStorage.setItem(
              `${cityname}`,
              JSON.stringify(cityWeather)
            );

            let listBtn = document.createElement("button");
            listBtn.classList.add("list-group-item");
            listBtn.classList.add("list-group-item-action");
            listBtn.setAttribute("id", `${text.value}weather`);
            listBtn.setAttribute("type", "button");
            listBtn.textContent = text.value;
            document.querySelector(".list-group").append(listBtn);

            console.log(data);
            console.log(card);
            console.log(cityWeather);
          });
      });

    console.log(lat);

    console.log(cityname);
  });
  //document.getElementById('searchfield')
});

/*
On searchbutton click:
            Grab values from input text
            Make an API call with cityname provided from text input
            If the call is successful,display data
            Bonus:
                City name gets saved in local storage
            History of list of cities searrched*/

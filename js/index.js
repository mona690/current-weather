async function search(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9418ac7964bd403fbda211126241206&q=${location}&days=3`
  );
  if (response.ok && response.status !== 400) {
    let data = await response.json();
    displayCurrent(data.location, data.current);
    displayAnother(data.forecast.forecastday);
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  search(event.target.value);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent(location, current) {
  if (current != null) {
    var e = new Date(current.last_updated.replace(" ", "T"));
    let n = `<div class="today forecast">
      <div class="forecast-header" id="today">
        <div class="day">${days[e.getDay()]}</div>
        <div class="date">${e.getDate()} ${monthNames[e.getMonth()]}</div>
      </div>
      <div class="forecast-content" id="current">
        <div class="location">${location.name}</div>
        <div class="degree">
          <div class="num">${current.temp_c}<sup>o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${current.condition.icon}" alt="" width="90">
          </div>
        </div>
        <div class="custom">${current.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span>
        <span><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
      </div>
    </div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}

function displayAnother(forecastDays) {
  let t = "";
  for (let e = 1; e < forecastDays.length; e++) {
    t += `<div class="forecast">
      <div class="forecast-header">
        <div class="day">${days[new Date(forecastDays[e].date.replace(" ", "T")).getDay()]}</div>
      </div>
      <div class="forecast-content">
        <div class="forecast-icon">
          <img src="https:${forecastDays[e].day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree">${forecastDays[e].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${forecastDays[e].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${forecastDays[e].day.condition.text}</div>
      </div>
    </div>`;
  }
  document.getElementById("forecast").innerHTML += t;
}

// Get user's location and fetch weather
function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        search(`${lat},${lon}`);
      },
      (error) => {
        alert("Unable to retrieve your location. Please enter a location manually.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Fetch weather for user's location on page load
window.onload = getLocationAndWeather;

// Existing code for background image/color generator
+(function () {
  var elBgImg = "[data-bg-image]";
  $(elBgImg).each(function () {
    var image = $(this).data("bg-image");
    $(this).css("background-image", "url(" + image + ")");
  });

  var elBgClr = "[data-bg-color]";
  $(elBgClr).each(function () {
    var color = $(this).data("bg-color");
    $(this).css("background-color", color);
  });

  $(window).load(function () {
    var $container = $(".filterable-items");
    $container.isotope({
      filter: "*",
      layoutMode: "fitRows",
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });

    $(".filterable-nav a").click(function (e) {
      e.preventDefault();
      $(".filterable-nav .current").removeClass("current");
      $(this).addClass("current");

      var selector = $(this).attr("data-filter");
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });

    $(".mobile-filter").change(function () {
      var selector = $(this).val();
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
      return false;
    });
  });
})(jQuery);

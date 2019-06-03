const ipgeolocation = {
    list: "/api/ipgeolocation/statistics",
    weather: "/api/ipgeolocation/weather",

};

mapboxgl.accessToken = 'pk.eyJ1Ijoib2dvMTIzIiwiYSI6ImNqdnh6OXN3eTA4aDQ0OXM3ZXpiNDFmZW0ifQ.QmSIcOHd48rHQEZJb0WU6Q';

const initMap = container => {

    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/ogo123/cjw8dsa9c5ko61cnwxyn68nbf',
        center: [-122.424100, 37.780000],
        zoom: 12.0
    });
    return map;
};

const weather = async (element) => {
    var weatherUri = `/api/ipgeolocation/weather?lat=${element.longitude}&lon=${element.latitude}`;
    const weather = await fetch(weatherUri);
    const weatherJson = await weather.json();
    return weatherJson;
}

document.addEventListener("DOMContentLoaded", async () => {

    let map = initMap("map");
    let ip = [];
    const elLocation = document.getElementById("ipgeolocation");
    const data = await fetch(ipgeolocation.list);
    const dataJson = await data.json();
    let userMarker = new mapboxgl.Marker();
    let visits = [];
    let visitsRatingEl = document.getElementById("visitsRating");
    let clearButton = document.getElementById("clearAll");


    const displayVisits = (filteringIp) => {
        let checkChildren = elLocation.children || [];
        for (let index = 0; index < checkChildren.length;) {
            const element = checkChildren[index];
            if (element.className === "record") {
                elLocation.removeChild(element);
                continue;
            }
            index++;
        }
        visits = [];
        dataJson.forEach(element => {
            visits.push(element.visits);
            ip.push(element.ip);
            let userMarker = new mapboxgl.Marker()
                .setLngLat([element.longitude, element.latitude])
                .addTo(map);
            const p = new mapboxgl.Popup({ className: 'here' }).setHTML(
            ).on("open", () => {
                weather(element).then(weatherJson => {
                    p.setHTML('<div class="popup"><h4>You visited our site  </h4>' + element.visits + " " + "times" + '<br><img src="'
                        + weatherJson.current.condition.icon + '"/><br>' + weatherJson.current.temp_c + '&#8451;</div>');
                });
            });
            userMarker.setPopup(p)

            if (filteringIp === "" || filteringIp === element.ip) {
                const tEl = document.createElement("div");
                tEl.classList.add("record");
                tEl.innerHTML = element.ip + " , " + element.country_name + " , " + element.country_capital + " , " + element.state_prov
                    + " , " + element.district + " , " + element.city + " , " + '<img class="flag" src="' + element.country_flag + '" />';

                elLocation.appendChild(tEl);
                tEl.addEventListener("click", async () => {

                    if (element.longitude !== undefined && element.latitude !== undefined) {
                        map.flyTo({ center: [element.longitude, element.latitude] });

                    }

                });
            }

        });

        visits.sort(function (a, b) {
            return a - b;
        });
        console.log(visits);
    }
    const clearRatings = () => {
        let checkChildren = visitsRatingEl.children || [];
        for (let index = 0; index < checkChildren.length;) {
            const element = checkChildren[index];
            if (element.className === "visitMax" || element.className === "visitMin") {
                visitsRatingEl.removeChild(element);
                continue;
            }
            index++;
        }
    }

    let visitMinBtn = document.getElementById("minVisit");
    visitMinBtn.addEventListener("click", () => {
        clearRatings();
        const visitMinDiv = document.createElement("div");
        visitMinDiv.classList.add("visitMin");
        visitsRatingEl.appendChild(visitMinDiv);
        visitMinDiv.innerHTML = "Min visits" + " " + visits[0];

    })

    let visitMaxBtn = document.getElementById("maxVisit");
    visitMaxBtn.addEventListener("click", () => {
        clearRatings();
        const visitMaxDiv = document.createElement("div");
        visitMaxDiv.classList.add("visitMax");
        visitsRatingEl.appendChild(visitMaxDiv)
        visitMaxDiv.innerHTML = "Max visits" + " " + visits[visits.length - 1];

    })

    let filterIp = document.getElementById("searchIp");

    let btnSearch = document.getElementById("search");
    btnSearch.addEventListener("click", () => {

        displayVisits(filterIp.value);
    });
    displayVisits("");
    clearButton.addEventListener("click", () => {
        clearRatings();
    });

});


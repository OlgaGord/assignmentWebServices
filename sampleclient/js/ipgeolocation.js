const ipgeolocation = {
    list: "/api/ipgeolocation/statistics",
    weather: "/api/ipgeolocation/weather"

};

mapboxgl.accessToken = 'pk.eyJ1Ijoib2dvMTIzIiwiYSI6ImNqdnh6OXN3eTA4aDQ0OXM3ZXpiNDFmZW0ifQ.QmSIcOHd48rHQEZJb0WU6Q';

const initMap = container => {

    const map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/ogo123/cjw8dsa9c5ko61cnwxyn68nbf',
        center: [-122.424100, 37.780000],
        zoom: 9.0
    });
    return map;
};

document.addEventListener("DOMContentLoaded", async () => {
    const weather = async (element) => {
        var weatherUri = `/api/ipgeolocation/weather?lat=${element.longitude}&lon=${element.latitude}`;
        const weather = await fetch(weatherUri);
        const weatherJson = await weather.json();
        return weatherJson;
    }
    let map = initMap("map");
    let markers = [];

    const elLocation = document.getElementById("ipgeolocation");
    const data = await fetch(ipgeolocation.list);
    const dataJson = await data.json();
    let userMarker = new mapboxgl.Marker();
    dataJson.forEach(element => {
        weather(element).then(weatherJson => {
            let userMarker = new mapboxgl.Marker()
                .setLngLat([element.longitude, element.latitude])
                .setPopup(
                    new mapboxgl.Popup({ className: 'here' }).setHTML(
                        '<h4>You visited our site  </h4>' + element.visits + "times" + '<img src="' + weatherJson.current.condition.icon + '"/>'
                    ))
                .addTo(map)
                .togglePopup();

        });
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

    });

});


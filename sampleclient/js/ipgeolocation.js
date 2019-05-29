const ipgeolocation = {
    list: "http://localhost:9000/api/ipgeolocation/AllTracks"

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

    // const map = document.getElementById("map");
    let map = initMap("map");
    const elLocation = document.getElementById("ipgeolocation");
    const data = await fetch(ipgeolocation.list);
    const dataJson = await data.json();

    dataJson.forEach(element => {
        const tEl = document.createElement("div");
        tEl.innerHTML = element.ip + " , " + element.country_name + " , " + element.country_capital + " , " + element.state_prov + " , " + element.district + " , " + element.city + " , " + element.country_flag + ' , ' + element.latitude + ' , ' + element.longitude;
        elLocation.appendChild(tEl);

    });






});


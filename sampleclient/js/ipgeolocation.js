const ipgeolocation = {
    list: "http://localhost:9000/api/ipgeolocation/AllTracks"

};

document.addEventListener("DOMContentLoaded", async () => {

    const elLocation = document.getElementById("ipgeolocation");

    const data = await fetch(ipgeolocation.list);
    const dataJson = await data.json();
    // console.log(dataJson);

    dataJson.forEach(element => {
        const tEl = document.createElement("div");

        // "latitude": 45.4553, "longitude": -75.7652



        tEl.innerHTML = element.ip + " , " + element.country_name + " , " + element.country_capital + " , " + element.state_prov + " , " + element.district + " , " + element.city + " , " + element.country_flag;
        elLocation.appendChild(tEl);

    });


});


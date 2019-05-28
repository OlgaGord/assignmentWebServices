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
        tEl.innerHTML = element.ip;
        elLocation.appendChild(tEl);

    });


});


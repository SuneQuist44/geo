const getLocation = (async function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchContent)
    } else {
        console.log('No location found')
    }
}())

let ids = 1;
async function fetchContent(position) {
    const url = `http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=${position.coords.latitude}&coordY=${position.coords.longitude}&maxRadius=1000&maxNumber=30&format=json`
    const res = await fetch(url);
    const data = await res.json();
    let departureUrl = `http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?${data.LocationList.StopLocation.map(item => 'id' + String(ids++) + '=' + item.id)}&rttime&format=json&useBus=1`
    departureBoard(departureUrl.split(',').join('&'));
}

async function departureBoard(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.MultiDepartureBoard.Departure);
}
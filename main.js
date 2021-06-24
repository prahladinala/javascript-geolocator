const findMyState = () => {
    const status = document.querySelector('.status');
    const country = document.querySelector('.country');
    const continent = document.querySelector('.continent');
    const mandal = document.querySelector('.mandal');
    const mapLink = document.querySelector('#map-link');
    const gmapLink = document.querySelector('#gmap-link');
    mapLink.href = '';
    mapLink.textContent = '';
    gmapLink.href = '';
    gmapLink.textContent = '';
    const success = (position) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude + " " + latitude)
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = "Get Direction Via Open Street Map";
        // https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393
        gmapLink.href = `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
        gmapLink.textContent = "Get Direction Via Google Map";
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                status.textContent = `State: ${data.principalSubdivision}`
                country.textContent = `Country: ${data.countryName}`
                continent.textContent = `Continent: ${data.continent}`
                mandal.textContent = `Mandal/Locality: ${data.locality}`
            })


    }
    const error = () => {
        status.textContent = "Unable to retrieve your location"
    }
    //Asks user for permission
    navigator.geolocation.getCurrentPosition(success, error);

}

document.querySelector('.find-state').addEventListener('click', findMyState);
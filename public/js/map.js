mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    center: Listing.geometry.coordinates,
    zoom: 10
});

new mapboxgl.Marker({ color: 'red' })
    .setLngLat(Listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${Listing.title}</h3><p>${Listing.location}</p>`)
    )
    .addTo(map);

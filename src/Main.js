import { useEffect, useRef, useState } from 'react';
import './App.css';
const markers = [
    {
        lat: 47.9119453,
        lng: 106.8983796,
    },
    {
        lat: 47.9138608,
        lng: 106.912096,
    }
]

export const Main = () => {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const [ myCoords, setMyCoords ] = useState({});
    const [ makerIndex, setMakerIndex ] = useState(0);

    useEffect(() => {
        console.log('temka')
        mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
            center: {lat: 47.945449, lng: 107.9149359},
            zoom: 14,
            
        });
        console.log(mapRef);
        const locationWatcherId = navigator.geolocation.watchPosition(({ coords }) => {
            setMyCoords({
                lat: coords.latitude,
                lng: coords.longitude,
            });
        }, ({ message }) => {
            console.error(message);
        });

        return () => {
            navigator.geolocation.clearWatch(locationWatcherId);
        }
    }, [])

    useEffect(() => {
        if (!myCoords.lat) return;

        mapRef.current.setCenter(myCoords);
        const myMarker = new window.google.maps.Marker({
            position: myCoords,
            map: mapRef.current,
        });

        return () => {
            myMarker.setMap(null);
        }
    }, [myCoords])

    const onAddMarker = () => {
        new window.google.maps.Marker({
            position: markers[makerIndex],
            map: mapRef.current,
        });
        setMakerIndex(makerIndex + 1);
    }

    return (
        <div>
            zenly app
            <div id="map" ref={ mapContainerRef }></div>
        </div>
    )
}
'use client'

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { usePinStore } from '../store/usePinStore';
import MyMarkerComponent from './MyMarketComponent';


export default function MapComponent() {

    // get data from Zustand Store
    const pins = usePinStore((state) => state.pins);


    function MapClickHandler() {

        const addPinFromMapClick = usePinStore((state) => state.addPinFromMapClick);
        // use leaflet's useMapEvents hook to listen for map clicks
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                addPinFromMapClick(lat, lng);
            },
        });
        return null;
    }



    // set melbourne as default center
    const defaultCenter: L.LatLngExpression = [-37.8136, 144.9631];

    return (
        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />

            {pins.map((pin, index) => (
                <MyMarkerComponent key={pin.id} index={index} pin={pin} />
            ))}
        </MapContainer>
    );
}
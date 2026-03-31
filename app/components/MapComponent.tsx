'use client'

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { usePinStore } from '../store/usePinStore';
import MyMarkerComponent from './MyMarketComponent';
import { useEffect, useState } from 'react';

import { useMap } from 'react-leaflet';

// move the map center when a pin's popUp is opened
function RecenterAutomatically({ center }: { center: L.LatLngExpression }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, map.getZoom()); // 如果想要丝滑的动画效果
    }, [center, map]);

    return null;
}

export default function MapComponent() {

    // set melbourne as default center
    const defaultCenter: L.LatLngExpression = [-37.8136, 144.9631];
    // get data from Zustand Store
    const pins = usePinStore((state) => state.pins);
    const [centerPoint, setCenterPoint] = useState<L.LatLngExpression>(defaultCenter);


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

    useEffect(() => {
        const focusMarker = pins.find((item) => {
            return item.popUp
        })
        if (focusMarker != undefined) {
            setCenterPoint([focusMarker.lat, focusMarker.lng]);
        }

    }, [pins]);





    return (
        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterAutomatically center={centerPoint} />
            <MapClickHandler />

            {pins.map((pin, index) => (
                <MyMarkerComponent key={pin.id} index={index} pin={pin} />
            ))}
        </MapContainer>
    );
}
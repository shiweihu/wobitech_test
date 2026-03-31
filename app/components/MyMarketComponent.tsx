
import { Marker, Popup } from 'react-leaflet';
import { PinItem } from '../model/pinItem';
import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { usePinStore } from '../store/usePinStore';
import { formatCoordinate } from '../utils/utils';






// custom marker icon
const myMarkerIcon = new L.Icon({
    iconUrl: '/MapPin.svg',
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
});

export default function MyMarkerComponent({ index, pin }: { index: number; pin: PinItem }) {


    const markerRef = useRef<L.Marker>(null);
    const updatePinLocation = usePinStore((state) => state.updatePinLocation);
    // define dragend event handlers for the marker
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker != null) {
                const newLatLng = marker.getLatLng();
                // update the pin's location in Zustand store
                updatePinLocation(pin.id, newLatLng.lat, newLatLng.lng);
            }
        },
    }), [pin.id, updatePinLocation]);



    // control popup open/close based on pin.popUp state
    useEffect(() => {
        if (pin.popUp && markerRef.current) {
            markerRef.current.openPopup();
        } else if (!pin.popUp && markerRef.current) {
            markerRef.current.closePopup();
        }
    }, [pin]);


    return (

        <Marker ref={markerRef} key={pin.id} position={[pin.lat, pin.lng]} icon={myMarkerIcon}
            draggable={true} eventHandlers={eventHandlers}
        >
            <Popup closeButton={true} autoClose={false} closeOnClick={false} >
                <div className="text-sm">
                    <p className="font-bold mb-1">Pin #{index + 1}</p>
                    <p className="text-gray-600 mb-2">{pin.address}</p>
                    <p className="text-xs text-gray-400">
                        {formatCoordinate(pin.lat, 'lat')} {formatCoordinate(pin.lng, 'lng')}
                    </p>
                </div>
            </Popup>
        </Marker>
    );
}
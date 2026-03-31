'use client'

import dynamic from 'next/dynamic';

// dynamic import the map component to prevent SSR issues with Leaflet
const DynamicMap = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => <div className="flex h-full w-full items-center justify-center bg-gray-100">Loading Map...</div>,
});

export default function MapBoard() {
    return (
        <div className="h-full w-full relative z-0">
            <DynamicMap />
        </div>
    );
}
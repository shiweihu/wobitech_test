
'use client'
import { MapPin, Trash2 } from 'lucide-react';
import { PinItem } from '../model/pinItem';


export function PinItemComponent({ index, pinItem, onDelete, onInteract }: { index: number, pinItem: PinItem, onInteract: (id: string) => void, onDelete: (id: string) => void }) {

    const handleDeleteClick = (id: string) => {
        onDelete(id);
    };

    const handleInteractClick = (id: string) => {
        onInteract(id);
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
            onMouseEnter={() => handleInteractClick(pinItem.id)} onClick={() => handleInteractClick(pinItem.id)} >
            <div className="flex items-center gap-4">
                {/* The light blue numbers are*/}
                <div className="w-9 h-9 shrink-0 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-sm font-medium">
                    #{index}
                </div>
                {/* information */}
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 text-sm">Pin #{index}</span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {pinItem.lat}"S {pinItem.lng}"E
                    </span>
                </div>
            </div>
            {/* delete button */}
            <button className="p-2 shrink-0 text-red-400 border border-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                onClick={() => {
                    handleDeleteClick(pinItem.id)
                }}>
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
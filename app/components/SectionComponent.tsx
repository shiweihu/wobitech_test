
'use client'

import { MapPin } from 'lucide-react';
import { usePinStore } from '../store/usePinStore';
import { PinItemComponent } from './PinItemComponent';
import { AnimatePresence, motion } from 'motion/react';

export default function SectionComponent() {
    const pins = usePinStore((state) => state.pins);
    const removePin = usePinStore((state) => state.removePin);
    const updatePinPopUp = usePinStore((state) => state.updatePinPopUp);

    return (
        <div>
            <section className="
                /* 1. 基础定位：绝对定位 */
                absolute 
                z-20 
                bg-white 
                shadow-2xl 
                overflow-hidden
                flex flex-col

                /* 2. mobile */
                bottom-0 
                left-0 
                right-0 
                w-full 
                h-[40%]        
                rounded-t-xl 
                border-t border-gray-100

                /* landscape */
                md:top-[80px]  
                md:bottom-0 
                md:left-6 
                md:w-80        
                md:h-auto      
                md:rounded-t-xl
                md:border      

                /* 3. desktop */
                lg:rounded-xl
                lg:bottom-6
                

            "
                onMouseLeave={() => {
                    updatePinPopUp();
                }}
            >

                {/* title */}
                <div className="p-5 border-b border-gray-100 bg-white">
                    <h2 className="text-lg font-bold text-gray-800">Pin Lists</h2>
                </div>

                {/* scrollable area */}
                <div className="flex-1 overflow-y-auto">
                    {pins.length === 0 ? (
                        // ==========================================
                        // Empty UI
                        // ==========================================
                        <div className="flex flex-col items-center  flex-1 p-6 text-center select-none mt-5">
                            <MapPin className="w-10 h-10 text-gray-400 mb-3" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold text-gray-500 mb-1">
                                No Result Found
                            </h3>
                            <p className="text-sm text-gray-400">
                                Your map pin list will show in here.
                            </p>
                        </div>
                    ) : null
                    }
                    <AnimatePresence>
                        {pins.map((pin, index) => {
                            return (
                                <motion.div
                                    key={"motion.div" + pin.id}
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <PinItemComponent key={pin.id} index={index + 1} pinItem={pin} onDelete={(id) => {
                                        removePin(id);
                                    }} onInteract={(id) => {
                                        updatePinPopUp(id);
                                    }} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section >
        </div >
    );
}
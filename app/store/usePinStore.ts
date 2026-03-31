import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PinItem } from '../model/pinItem'; // 假设你已经在这个文件里定义了 PinItem 接口

interface PinState {
    pins: PinItem[];
    refreshAllAddresses: () => Promise<void>;
    addPinFromMapClick: (lat: number, lng: number) => Promise<void>;
    removePin: (id: string) => void;
    updatePinPopUp: (id?: string) => void;
    updatePinLocation: (id: string, lat: number, lng: number) => Promise<void>;
}


async function queryAddress(lat: number, lng: number): Promise<string> {
    try {
        // 1. 定义基础 URL
        const url = new URL('https://nominatim.openstreetmap.org/reverse');

        // 2. 使用 URLSearchParams 传入参数对象
        const params = {
            format: 'json',
            lat: String(lat), // 注意：参数值需要转换成字符串
            lon: String(lng),
            'accept-language': 'en',
        };

        // 3. 将参数附加到 url 上
        url.search = new URLSearchParams(params).toString();
        const response = await fetch(url);
        const data = await response.json();
        return data.display_name || 'Unknown Location';
    } catch (error) {
        return "Location details unavailable"
    }
}

export const usePinStore = create<PinState>()(
    persist(
        (set, get) => ({
            pins: [],
            refreshAllAddresses: async () => {
                const currentPins = get().pins;
                if (currentPins.length === 0) return;

                // // 1. 先把所有项设为 loading
                // set((state) => ({
                //     pins: state.pins.map(p => ({ ...p, loading: true }))
                // }));

                // 2. 并行发送请求 (Promise.all) 以提高效率
                const updatedPins = await Promise.all(
                    currentPins.map(async (pin) => {
                        const actualAddress = await queryAddress(pin.lat, pin.lng);
                        return { ...pin, address: actualAddress, loading: false };
                    })
                );

                // 3. 一次性更新状态
                set({ pins: updatedPins });
            },
            addPinFromMapClick: async (lat, lng) => {
                const newId = crypto.randomUUID();
                const newPin: PinItem = {
                    id: newId, lat, lng,
                    address: 'Fetching address...',
                    createdAt: Date.now(),
                    loading: true,
                    popUp: false
                };
                set((state) => ({ pins: [...state.pins, newPin] }));
                const actualAddress = await queryAddress(lat, lng);
                set((state) => ({
                    pins: state.pins.map((pin) =>
                        pin.id === newId ? { ...pin, address: actualAddress, loading: false } : pin
                    ),
                }));

            },

            updatePinLocation: async (id, lat, lng) => {
                set((state) => ({
                    pins: state.pins.map((p) =>
                        p.id === id ? { ...p, lat, lng, address: "Fetching...", loading: true } : p
                    ),
                }));
                const actualAddress = await queryAddress(lat, lng);
                set((state) => ({
                    pins: state.pins.map((p) =>
                        p.id === id ? { ...p, address: actualAddress, loading: false } : p
                    ),
                }));
            },

            updatePinPopUp: (id?: string) => set((state) => ({
                pins: state.pins.map((item) => ({
                    ...item,
                    popUp: id ? item.id === id : false
                }))
            })),

            removePin: (id) => set((state) => ({
                pins: state.pins.filter(p => p.id !== id)
            })),
        }),
        {
            // 2. 持久化配置
            name: 'map-pins-storage', // 存储在 localStorage 里的 key 名
            storage: createJSONStorage(() => localStorage), // 显式指定使用 localStorage
            // (可选) 如果你不想把 loading 状态存进去，可以加个部分过滤
            partialize: (state) => ({
                pins: state.pins.map(p => ({ ...p, loading: true, popUp: false }))
            }),
            onRehydrateStorage: (state) => {

                return (state, error) => {
                    if (!error && state) {
                        state.refreshAllAddresses();
                    }
                };
            },
        }
    )
);
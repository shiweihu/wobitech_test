export interface PinItem {
    id: string;          // 唯一标识符 (推荐使用 uuid 或时间戳)
    lat: number;         // 纬度 (Latitude)
    lng: number;         // 经度 (Longitude)
    address: string;     // 反向地理编码获取到的具体地址
    createdAt: number;   // 创建时间，方便排序
    loading: boolean,
    popUp: boolean
}


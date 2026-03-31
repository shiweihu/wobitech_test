'use client'


import MapBoard from "./components/MapBoard";
import { Map } from 'lucide-react';
import SectionComponent from "./components/SectionComponent";



export default function Home() {





  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">

      {/* 1. 顶部悬浮导航栏 */}
      <header className="absolute top-0 left-0 w-full h-14 bg-white shadow-sm z-20 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
          <Map className="w-5 h-5" />
          <span>Map Pinboard</span>
        </div>
      </header>

      {/* 2. 左侧悬浮图钉列表面板 */}
      <SectionComponent />

      {/* 3. 全屏地图组件 (处于最底层 z-0) */}
      <div className="absolute inset-0 z-0">
        <MapBoard />
      </div>

    </main>
  );
}

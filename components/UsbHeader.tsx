import React from 'react';
import { StorageStats } from '../types';

interface UsbHeaderProps {
  stats: StorageStats;
}

export const UsbHeader: React.FC<UsbHeaderProps> = ({ stats }) => {
  const percentage = (stats.used / stats.total) * 100;

  return (
    <div className="bg-slate-900 border-b border-slate-700 p-4 shadow-lg sticky top-0 z-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Device Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <i className="fa-solid fa-usb text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide uppercase">VITUALDRIVE <span className="text-cyan-400 text-xs align-top">Ultra</span></h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              KẾT NỐI: G:/DRIVE_SYNC
            </div>
          </div>
        </div>

        {/* Storage Bar */}
        <div className="w-full md:w-1/3 bg-slate-800 rounded-lg p-3 border border-slate-700">
          <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
            <span>Đã dùng: {stats.used.toFixed(1)} TB</span>
            <span>Tổng: {stats.total} TB</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Actions Placeholder */}
        <div className="flex gap-2 text-slate-400">
           <button className="p-2 hover:text-white transition-colors" title="Cài đặt">
             <i className="fa-solid fa-gear"></i>
           </button>
           <button className="p-2 hover:text-red-400 transition-colors" title="Ngắt kết nối">
             <i className="fa-solid fa-eject"></i>
           </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ProjectCategory } from '../types';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { url?: string; title?: string; content?: string; category: string; isManual: boolean }) => void;
  isProcessing: boolean;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onAdd, isProcessing }) => {
  const [activeTab, setActiveTab] = useState<'LINK' | 'MANUAL'>('LINK');
  
  // Link State
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<string>('AUTO');

  // Manual State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'LINK' && url.trim()) {
      onAdd({ url, category, isManual: false });
      resetForm();
    } else if (activeTab === 'MANUAL' && title.trim()) {
      // Manual entry defaults to PROJECT_INFO usually, or we could add a selector. 
      // For now, let's force PROJECT_INFO as per user request for "Information".
      onAdd({ 
        title, 
        content, 
        category: ProjectCategory.PROJECT_INFO, 
        isManual: true 
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setUrl('');
    setCategory('AUTO');
    setTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-slate-900 border border-slate-600 rounded-2xl w-full max-w-md p-6 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-brands fa-google-drive text-green-400"></i>
          Thêm mới
        </h2>

        {/* Tabs */}
        <div className="flex p-1 bg-slate-800 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('LINK')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'LINK' 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nhập Link (Tự động)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('MANUAL')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'MANUAL' 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nhập tay (Thông tin)
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {activeTab === 'LINK' ? (
            <>
              {/* URL Input */}
              <div className="relative mb-4">
                <i className="fa-solid fa-link absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                  autoFocus
                />
              </div>

              {/* Category Select */}
              <div className="relative mb-6">
                <i className="fa-solid fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm appearance-none cursor-pointer hover:bg-slate-750"
                >
                  <option value="AUTO">✨ Tự động phân loại (AI)</option>
                  <option value={ProjectCategory.PROJECT_INFO}>📂 Thông tin dự án</option>
                  <option value={ProjectCategory.DOCUMENTS}>📄 Tài liệu dự án</option>
                  <option value={ProjectCategory.SOURCE_CODE}>💻 Mã nguồn dự án</option>
                  <option value={ProjectCategory.OTHERS}>📦 File khác</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs"></i>
              </div>
            </>
          ) : (
            <>
              {/* Manual Title Input */}
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1 font-bold uppercase">Tiêu đề</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Kế hoạch triển khai Phase 1"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm"
                  autoFocus
                />
              </div>

              {/* Manual Content Input */}
              <div className="mb-6">
                <label className="block text-xs text-slate-400 mb-1 font-bold uppercase">Nội dung / Ghi chú</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung chi tiết..."
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 text-sm resize-none"
                />
              </div>
              
              <div className="mb-6 text-xs text-blue-400 flex items-center gap-2 bg-blue-500/10 p-2 rounded border border-blue-500/20">
                <i className="fa-solid fa-info-circle"></i>
                Sẽ được lưu vào mục: <b>Thông tin dự án</b>
              </div>
            </>
          )}

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-sm font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={(activeTab === 'LINK' && !url.trim()) || (activeTab === 'MANUAL' && !title.trim()) || isProcessing}
              className={`px-6 py-2 rounded-lg bg-cyan-600 text-white font-semibold text-sm shadow-lg shadow-cyan-900/50 hover:bg-cyan-500 transition-all flex items-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing && activeTab === 'LINK' ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <i className={`fa-solid ${activeTab === 'LINK' ? 'fa-download' : 'fa-plus'}`}></i>
                  {activeTab === 'LINK' ? 'Thêm' : 'Tạo mới'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
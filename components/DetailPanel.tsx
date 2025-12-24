import React from 'react';
import { VirtualFile, ProjectCategory, FileType } from '../types';

interface DetailPanelProps {
  file: VirtualFile | null;
  onClose: () => void;
}

const getCategoryLabel = (category?: ProjectCategory | string) => {
  switch (category) {
    case ProjectCategory.PROJECT_INFO: return "Thông tin dự án";
    case ProjectCategory.DOCUMENTS: return "Tài liệu dự án";
    case ProjectCategory.SOURCE_CODE: return "Mã nguồn dự án";
    case ProjectCategory.OTHERS: return "File khác";
    default: return category || "Chưa phân loại";
  }
};

const getFileTypeLabel = (type: FileType) => {
  switch (type) {
    case FileType.NOTE: return "GHI CHÚ";
    case FileType.ARCHIVE: return "NÉN / LƯU TRỮ";
    case FileType.IMAGE: return "HÌNH ẢNH";
    case FileType.VIDEO: return "VIDEO";
    case FileType.CODE: return "MÃ NGUỒN";
    case FileType.SHEET: return "BẢNG TÍNH";
    case FileType.DOC: return "VĂN BẢN";
    case FileType.PDF: return "PDF";
    default: return type;
  }
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ file, onClose }) => {
  if (!file) return null;

  const isNote = file.type === FileType.NOTE;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 p-6 shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <div className="mt-8">
        <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700 mx-auto shadow-inner">
           {isNote ? (
             <i className="fa-solid fa-note-sticky text-4xl text-yellow-300"></i>
           ) : (
             <i className="fa-solid fa-file-lines text-4xl text-cyan-500"></i>
           )}
        </div>

        <h2 className="text-xl font-bold text-white text-center break-words mb-2 font-mono">
          {file.name}
        </h2>
        <p className="text-center text-slate-400 text-sm mb-6 uppercase tracking-wider font-bold">
          {getFileTypeLabel(file.type)}
        </p>

        <div className="space-y-6">
          
          {/* Content Block: Shows AI Summary for files, or Full Content for Notes */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">
              {isNote ? 'Nội dung' : 'Tóm tắt (AI)'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {isNote 
                ? (file.content || "Không có nội dung chi tiết.") 
                : `"${file.metadata?.description || 'Chưa có mô tả.'}"`
              }
            </p>
          </div>

          <div>
             <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">Thông tin chi tiết</h3>
             <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Dung lượng</span>
                  <span className="text-slate-200 font-mono">{file.size}</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ngày tạo</span>
                  <span className="text-slate-200 font-mono">{file.createdAt.toLocaleDateString('vi-VN')}</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Danh mục</span>
                  <span className="text-cyan-400 font-semibold">{getCategoryLabel(file.metadata?.category)}</span>
                </li>
             </ul>
          </div>

          {file.metadata?.tags && file.metadata.tags.length > 0 && (
            <div>
              <h3 className="text-xs uppercase text-slate-500 font-bold mb-2">Thẻ (Tags)</h3>
              <div className="flex flex-wrap gap-2">
                {file.metadata?.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!isNote && (
            <div className="pt-4">
              <a 
                href={file.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-center rounded-lg text-white font-semibold transition-all border border-slate-600 hover:border-slate-500"
              >
                <i className="fa-solid fa-external-link-alt mr-2"></i>
                Mở file gốc
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
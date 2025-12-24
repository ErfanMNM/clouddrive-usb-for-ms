import React from 'react';
import { VirtualFile, FileType } from '../types';

interface FileCardProps {
  file: VirtualFile;
  onClick: (file: VirtualFile) => void;
}

const getIconForType = (type: FileType) => {
  switch (type) {
    case FileType.PDF: return <i className="fa-regular fa-file-pdf text-red-500 text-4xl"></i>;
    case FileType.DOC: return <i className="fa-regular fa-file-word text-blue-500 text-4xl"></i>;
    case FileType.SHEET: return <i className="fa-regular fa-file-excel text-green-500 text-4xl"></i>;
    case FileType.IMAGE: return <i className="fa-regular fa-file-image text-purple-500 text-4xl"></i>;
    case FileType.VIDEO: return <i className="fa-regular fa-file-video text-pink-500 text-4xl"></i>;
    case FileType.CODE: return <i className="fa-regular fa-file-code text-yellow-500 text-4xl"></i>;
    case FileType.ARCHIVE: return <i className="fa-regular fa-file-zipper text-orange-500 text-4xl"></i>;
    case FileType.NOTE: return <i className="fa-solid fa-note-sticky text-yellow-300 text-4xl"></i>;
    default: return <i className="fa-regular fa-file text-slate-400 text-4xl"></i>;
  }
};

export const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  return (
    <div 
      onClick={() => onClick(file)}
      className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-4 transition-all duration-300 cursor-pointer flex flex-col gap-3 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1"
    >
      {/* Header with Status */}
      <div className="flex justify-between items-start">
        <div className="opacity-80 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300">
          {getIconForType(file.type)}
        </div>
        {file.status === 'syncing' ? (
          <i className="fa-solid fa-circle-notch fa-spin text-cyan-400"></i>
        ) : (
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
        )}
      </div>

      {/* File Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-200 text-sm truncate mb-1" title={file.name}>
          {file.name}
        </h3>
        <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
          <span>{file.size}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
          <span>{file.metadata?.category || 'Chung'}</span>
        </p>
      </div>

      {/* Tags */}
      {file.metadata?.tags && (
        <div className="flex flex-wrap gap-1 mt-1">
          {file.metadata.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Selection border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-xl pointer-events-none"></div>
    </div>
  );
};
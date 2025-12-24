import React, { useState, useEffect } from 'react';
import { UsbHeader } from './components/UsbHeader';
import { FileCard } from './components/FileCard';
import { AddModal } from './components/AddModal';
import { DetailPanel } from './components/DetailPanel';
import { VirtualFile, StorageStats, FileType, ProjectCategory } from './types';
import { analyzeLinkContent } from './services/geminiService';

const CATEGORY_CONFIG = {
  [ProjectCategory.PROJECT_INFO]: { 
    label: 'Thông tin dự án', 
    icon: 'fa-folder-open', 
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30' 
  },
  [ProjectCategory.DOCUMENTS]: { 
    label: 'Tài liệu dự án', 
    icon: 'fa-file-lines', 
    color: 'text-green-400',
    borderColor: 'border-green-500/30'
  },
  [ProjectCategory.SOURCE_CODE]: { 
    label: 'Mã nguồn dự án', 
    icon: 'fa-code', 
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30'
  },
  [ProjectCategory.OTHERS]: { 
    label: 'File khác', 
    icon: 'fa-box-archive', 
    color: 'text-slate-400',
    borderColor: 'border-slate-700'
  },
};

// Default Initial Data
const INITIAL_FILES: VirtualFile[] = [
  {
    id: '1',
    name: 'Thông tin dự án',
    originalUrl: '',
    size: '2 KB',
    type: FileType.NOTE,
    content: 'Tên dự án: Máy kích hoạt QR line số 04 Tương ớt.\nKhách hàng: Masan\nMô tả dự án: Hệ thống tự động kích hoạt và kiểm tra mã QR trên sản phẩm tương ớt tại dây chuyền số 04.',
    metadata: {
      description: 'Thông tin tổng quan về dự án máy kích hoạt QR tại Masan.',
      tags: ['masan', 'qr-code', 'line-04'],
      suggestedName: 'Thông tin dự án',
      category: ProjectCategory.PROJECT_INFO
    },
    createdAt: new Date('2024-03-01'),
    status: 'synced'
  },
  {
    id: '2',
    name: 'Tai_Lieu_Huong_Dan_Van_Hanh.pdf',
    originalUrl: 'https://drive.google.com/file/d/1lBSzLhtbjN8JrJzhsF5Qk94SUK95fp9Q/view?usp=drive_link',
    size: '4.2 MB',
    type: FileType.PDF,
    metadata: {
      description: 'Tài liệu hướng dẫn vận hành máy kích hoạt QR tại Masan.',
      tags: ['huong-dan', 'van-hanh', 'masan'],
      suggestedName: 'Tai_Lieu_Huong_Dan_Van_Hanh.pdf',
      category: ProjectCategory.DOCUMENTS
    },
    createdAt: new Date('2025-12-24'),
    status: 'synced'
  },
  {
    id: '3',
    name: 'Tai_Lieu_Thiet_Ke_Dien.pdf',
    originalUrl: 'https://drive.google.com/file/d/1Q9NtgzmKqh1t1Y012Z2ppKt25X8K7Zhz/view?usp=drive_link',
    size: '4.2 MB',
    type: FileType.PDF,
    metadata: {
      description: 'Tài liệu thiết kế điện máy kích hoạt QR tại Masan.',
      tags: ['huong-dan', 'van-hanh', 'masan'],
      suggestedName: 'Tai_Lieu_Thiet_Ke_Dien.pdf',
      category: ProjectCategory.DOCUMENTS
    },
    createdAt: new Date('2025-12-24'),
    status: 'synced'
  },
  {
    id: '4',
    name: 'Tai_Lieu_Huong_Dan_Van_Hanh.docx',
    originalUrl: 'https://docs.google.com/document/d/1r9B7o5sD9J8qDS3bjyASpXDdFDS-fPwZ/edit?usp=drive_link&ouid=111227326836927331738&rtpof=true&sd=true',
    size: '1.5 MB',
    type: FileType.DOC,
    metadata: {
      description: 'Tài liệu hướng dẫn vận hành máy kích hoạt QR tại Masan.',
      tags: ['huong-dan', 'van-hanh', 'masan'],
      suggestedName: 'Tai_Lieu_Huong_Dan_Van_Hanh.docx',
      category: ProjectCategory.DOCUMENTS
    },
    createdAt: new Date('2025-12-24'),
    status: 'synced'
  },
  {
    id: '5',
    name: 'source_code.zip',
    originalUrl: 'https://drive.google.com/file/d/1kBnIdKxFqFO35t0PdydAFpJA62tzMnYj/view?usp=drive_link',
    size: '28.4 MB',
    type: FileType.CODE,
    metadata: {
      description: 'Mã nguồn máy kích hoạt QR tại Masan.',
      tags: ['source', 'backend', 'core'],
      suggestedName: 'source_code.zip',
      category: ProjectCategory.SOURCE_CODE
    },
    createdAt: new Date('2024-03-15'),
    status: 'synced'
  },
  {
    id: '6',
    name: 'public.key',
    originalUrl: 'https://drive.google.com/file/d/1woIHRTk1zvBleVMCYZQELYbQ1LaXCIBj/view?usp=drive_link',
    size: '156.2 MB',
    type: FileType.VIDEO,
    metadata: {
      description: 'Khóa công khai máy kích hoạt QR tại Masan.',
      tags: ['public-key', 'masan'],
      suggestedName: 'public.key',
      category: ProjectCategory.OTHERS
    },
    createdAt: new Date('2024-03-10'),
    status: 'synced'
  },
  {
    id: '7',
    name: 'license.key',
    originalUrl: 'https://drive.google.com/file/d/1-VbvlZhN6Ww7rKtbn8-Nnu0Qa2EMPhM0/view?usp=drive_link',
    size: '340.5 MB',
    type: FileType.ARCHIVE,
    metadata: {
      description: 'Khóa bản quyền máy kích hoạt QR tại Masan.',
      tags: ['license-key', 'masan'],
      suggestedName: 'license.key',
      category: ProjectCategory.OTHERS
    },
    createdAt: new Date('2024-03-08'),
    status: 'synced'
  }
];

export default function App() {
  const [files, setFiles] = useState<VirtualFile[]>(INITIAL_FILES);
  const [stats, setStats] = useState<StorageStats>({ used: 4.5, total: 30 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

  // Calculate initial stats
  useEffect(() => {
    // Rough simulation of size calculation from string "XX MB"
    const calculateUsed = (fileList: VirtualFile[]) => {
      let totalMB = 0;
      fileList.forEach(f => {
        const sizeStr = f.size.toUpperCase();
        if (sizeStr.includes('GB')) {
          totalMB += parseFloat(sizeStr) * 1024;
        } else if (sizeStr.includes('MB')) {
          totalMB += parseFloat(sizeStr);
        } else if (sizeStr.includes('KB')) {
          totalMB += parseFloat(sizeStr) / 1024;
        }
      });
      return totalMB / 1024; // Convert MB to GB
    };

    const usedGB = 10.5;//calculateUsed(INITIAL_FILES);
    setStats({ used: parseFloat(usedGB.toFixed(2)), total: 64 });
  }, []);

  const handleAddFile = async (data: { 
    url?: string; 
    title?: string; 
    content?: string; 
    category: string; 
    isManual: boolean 
  }) => {
    
    // CASE 1: MANUAL ENTRY (PROJECT INFO)
    if (data.isManual && data.title) {
      const newFile: VirtualFile = {
        id: Date.now().toString(),
        name: data.title,
        originalUrl: '',
        size: '1 KB',
        type: FileType.NOTE,
        content: data.content,
        metadata: {
          description: data.content || '',
          tags: ['manual', 'note'],
          suggestedName: data.title,
          category: ProjectCategory.PROJECT_INFO // Force Project Info for manual
        },
        createdAt: new Date(),
        status: 'synced'
      };
      
      setFiles(prev => {
         const newFiles = [newFile, ...prev];
         return newFiles;
      });
      setIsModalOpen(false);
      return;
    }

    // CASE 2: LINK ENTRY (GEMINI AI)
    if (!data.url) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Analyze with Gemini
    const analysis = await analyzeLinkContent(data.url);

    // Determine category
    let finalCategory = analysis.category;
    if (data.category !== 'AUTO' && Object.values(ProjectCategory).includes(data.category as ProjectCategory)) {
        finalCategory = data.category as ProjectCategory;
    }

    const newFile: VirtualFile = {
      id: Date.now().toString(),
      name: analysis.cleanName,
      originalUrl: data.url,
      size: (Math.random() * 10 + 1).toFixed(1) + ' MB',
      type: analysis.fileType,
      metadata: {
        description: analysis.description,
        tags: analysis.tags,
        suggestedName: analysis.cleanName,
        category: finalCategory
      },
      createdAt: new Date(),
      status: 'synced'
    };

    setFiles(prev => {
        const newFiles = [newFile, ...prev];
        // Simple stats update simulation
        const sizeVal = parseFloat(newFile.size) / 1024; // MB to GB rough estimate
        setStats(s => ({...s, used: parseFloat((s.used + sizeVal).toFixed(2))}));
        return newFiles;
    });
    
    setIsProcessing(false);
    setIsModalOpen(false);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(prev => {
        const file = prev.find(f => f.id === id);
        const newFiles = prev.filter(f => f.id !== id);
        
        // Decrease stats logic (simplified)
        if (file) {
            let sizeVal = 0;
            if (file.size.includes('MB')) sizeVal = parseFloat(file.size) / 1024;
            else if (file.size.includes('KB')) sizeVal = parseFloat(file.size) / (1024 * 1024);
            else if (file.size.includes('GB')) sizeVal = parseFloat(file.size);
            
            setStats(s => ({...s, used: Math.max(0, parseFloat((s.used - sizeVal).toFixed(2)))}));
        }
        return newFiles;
    });
  };

  const renderSection = (category: ProjectCategory) => {
    const categoryFiles = files.filter(f => f.metadata?.category === category);
    if (categoryFiles.length === 0) return null;

    const config = CATEGORY_CONFIG[category];

    return (
      <div key={category} className="mb-10 animate-fade-in-up">
        <div className={`flex items-center gap-3 mb-4 pb-2 border-b ${config.borderColor}`}>
          <div className={`p-2 rounded-lg bg-slate-800 ${config.color}`}>
            <i className={`fa-solid ${config.icon}`}></i>
          </div>
          <h3 className="text-lg font-bold text-slate-200 uppercase tracking-wide">
            {config.label}
            <span className="ml-3 text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
              {categoryFiles.length}
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryFiles.map(file => (
            <FileCard 
              key={file.id} 
              file={file} 
              onClick={setSelectedFile}
            />
          ))}
        </div>
      </div>
    );
  };

  // Extract Project Information from the Note file if available
  const projectInfoFile = files.find(f => f.metadata?.category === ProjectCategory.PROJECT_INFO && f.type === FileType.NOTE);
  
  // Basic parsing logic to find "Tên dự án:" and "Mô tả dự án:"
  const projectName = projectInfoFile?.content?.match(/Tên dự án:\s*(.+?)(\n|$)/)?.[1]?.trim() || "Dữ liệu dự án";
  const projectDesc = projectInfoFile?.content?.match(/Mô tả dự án:\s*(.+?)(\n|$)/)?.[1]?.trim() || "Quản lý tài liệu dự án tập trung";

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
      <UsbHeader stats={stats} />

      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{projectName}</h2>
            <p className="text-slate-400 text-sm max-w-3xl">{projectDesc}</p>
          </div>
        </div>

        {/* Empty State */}
        {files.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-900/30">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
              <i className="fa-brands fa-google-drive text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">Dữ liệu trống</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Bạn có thể nhập link Google Drive để AI phân loại tự động.<br/>
              Hoặc nhập tay các thông tin dự án quan trọng.
            </p>
          </div>
        )}

        {/* Render Categorized Sections */}
        {files.length > 0 && (
          <div className="space-y-6">
            {renderSection(ProjectCategory.PROJECT_INFO)}
            {renderSection(ProjectCategory.DOCUMENTS)}
            {renderSection(ProjectCategory.SOURCE_CODE)}
            {renderSection(ProjectCategory.OTHERS)}
          </div>
        )}

      </main>

      <footer className="w-full text-center py-6 text-slate-600 text-xs font-mono border-t border-slate-800/50">
        Ứng dụng quản lý dữ liệu Mbox by Mte.
      </footer>

      <AddModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddFile}
        isProcessing={isProcessing}
      />

      {selectedFile && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedFile(null)}></div>
      )}
      
      <DetailPanel 
        file={selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
    </div>
  );
}
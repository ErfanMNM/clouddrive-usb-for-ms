import { GoogleGenAI, Type } from "@google/genai";
import { FileType, ProjectCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLinkContent = async (url: string): Promise<{
  fileType: FileType;
  description: string;
  tags: string[];
  cleanName: string;
  category: ProjectCategory;
}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Phân tích URL hoặc tên file này từ Google Drive/Cloud: "${url}". 
      
      Nhiệm vụ:
      1. Đoán định dạng file.
      2. Tạo mô tả ngắn gọn tiếng Việt.
      3. Đề xuất 3 thẻ (tags).
      4. Làm sạch tên file.
      5. QUAN TRỌNG: Phân loại file vào ĐÚNG 1 trong 4 nhóm sau:
         - 'PROJECT_INFO': Các file kế hoạch, task, Jira, Trello, brief, yêu cầu dự án.
         - 'DOCUMENTS': Các file tài liệu văn bản, PDF, Word, Excel, Slide, báo cáo.
         - 'SOURCE_CODE': Các file mã nguồn, Github, Gitlab, file .js .py .tsx, cấu hình.
         - 'OTHERS': Hình ảnh, video, file nén, âm thanh và các loại khác.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fileType: {
              type: Type.STRING,
              description: "Loại file dự đoán",
              enum: ["PDF", "DOC", "SHEET", "IMAGE", "VIDEO", "CODE", "ARCHIVE", "UNKNOWN"]
            },
            description: {
              type: Type.STRING,
              description: "Mô tả ngắn gọn tiếng Việt."
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Danh sách 3 tags."
            },
            cleanName: {
              type: Type.STRING,
              description: "Tên file gọn gàng."
            },
            category: {
              type: Type.STRING,
              description: "Phân loại vào 1 trong 4 nhóm.",
              enum: ["PROJECT_INFO", "DOCUMENTS", "SOURCE_CODE", "OTHERS"]
            }
          },
          required: ["fileType", "description", "tags", "cleanName", "category"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const data = JSON.parse(text);
    
    // Map string to Enum (FileType)
    let mappedFileType = FileType.UNKNOWN;
    if (Object.values(FileType).includes(data.fileType as FileType)) {
      mappedFileType = data.fileType as FileType;
    }

    // Map string to Enum (ProjectCategory)
    let mappedCategory = ProjectCategory.OTHERS;
    if (Object.values(ProjectCategory).includes(data.category as ProjectCategory)) {
      mappedCategory = data.category as ProjectCategory;
    }

    return {
      fileType: mappedFileType,
      description: data.description,
      tags: data.tags,
      cleanName: data.cleanName,
      category: mappedCategory
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      fileType: FileType.UNKNOWN,
      description: "Không thể phân tích liên kết.",
      tags: ["link"],
      cleanName: url.substring(0, 20) + "...",
      category: ProjectCategory.OTHERS
    };
  }
};
import React, { useRef, useState } from 'react';
import { FileAttachment } from '../types/demand';
import { Upload, X, FileText } from 'lucide-react';
import { formatFileSize } from '../utils/fileValidation';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  attachments: FileAttachment[];
  onRemoveAttachment: (id: string) => void;
  maxFiles?: number;
  maxSize?: number;
}

export function FileUpload({ 
  onFilesSelected,
  attachments,
  onRemoveAttachment,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-ffb400 bg-ffb400/5'
            : 'border-ffb400/20 hover:border-ffb400/40'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
        />
        
        <div className="text-center">
          <Upload className={`mx-auto h-12 w-12 ${isDragging ? 'text-ffb400' : 'text-ffb400/60'}`} />
          <div className="mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-ffb400 hover:text-ffb400/80 transition-colors"
            >
              Selecione arquivos
            </button>
            <p className="mt-1 text-sm text-gray-400">
              ou arraste e solte aqui
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Máximo {maxFiles} arquivos, até {formatFileSize(maxSize)} cada
          </p>
        </div>
      </div>

      {attachments.length > 0 && (
        <ul className="space-y-2">
          {attachments.map((file) => (
            <li 
              key={file.id}
              className="flex items-center justify-between p-3 bg-dark-300/50 rounded-lg border border-ffb400/10"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-ffb400/60 mr-2" />
                <div>
                  <p className="text-sm font-medium text-white">{file.filename}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemoveAttachment(file.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
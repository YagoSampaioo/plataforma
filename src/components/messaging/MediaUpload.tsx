import React, { useState } from 'react';
import { Upload, X, FileText, Image, Film } from 'lucide-react';
import { formatFileSize } from '../../utils/fileValidation';

interface MediaUploadProps {
  onFileSelected: (file: File) => void;
  currentMedia: { file: File; preview: string } | null;
  onRemoveMedia: () => void;
  accept: string;
  maxSize: number;
}

export function MediaUpload({ 
  onFileSelected, 
  currentMedia, 
  onRemoveMedia, 
  accept, 
  maxSize 
}: MediaUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isVideo = accept.startsWith('video');

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

    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
    e.target.value = ''; // Reset input
  };

  const validateAndProcessFile = (file: File) => {
    if (file.size > maxSize) {
      alert(`Arquivo muito grande. Tamanho máximo: ${formatFileSize(maxSize)}`);
      return;
    }

    if (!file.type.startsWith(accept.split('/')[0])) {
      alert('Tipo de arquivo não suportado');
      return;
    }

    onFileSelected(file);
  };

  return (
    <div className="space-y-4">
      {!currentMedia ? (
        <DropZone
          isDragging={isDragging}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          accept={accept}
          maxSize={maxSize}
          isVideo={isVideo}
        />
      ) : (
        <MediaPreview
          currentMedia={currentMedia}
          onRemoveMedia={onRemoveMedia}
        />
      )}
    </div>
  );
}

interface DropZoneProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  maxSize: number;
  isVideo: boolean;
}

function DropZone({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  fileInputRef,
  handleFileChange,
  accept,
  maxSize,
  isVideo
}: DropZoneProps) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging
          ? 'border-ffb400 bg-ffb400/5'
          : 'border-ffb400/20 hover:border-ffb400/40'
      }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      <div className="text-center">
        {isVideo ? (
          <Film className={`mx-auto h-12 w-12 ${isDragging ? 'text-ffb400' : 'text-ffb400/60'}`} />
        ) : (
          <Image className={`mx-auto h-12 w-12 ${isDragging ? 'text-ffb400' : 'text-ffb400/60'}`} />
        )}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-ffb400 hover:text-ffb400/80 transition-colors"
          >
            Selecione um {isVideo ? 'vídeo' : 'imagem'}
          </button>
          <p className="mt-1 text-sm text-gray-400">
            ou arraste e solte aqui
          </p>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Tamanho máximo: {formatFileSize(maxSize)}
        </p>
      </div>
    </div>
  );
}

interface MediaPreviewProps {
  currentMedia: { file: File; preview: string };
  onRemoveMedia: () => void;
}

function MediaPreview({ currentMedia, onRemoveMedia }: MediaPreviewProps) {
  return (
    <div className="relative">
      {currentMedia.file.type.startsWith('image/') ? (
        <img
          src={currentMedia.preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      ) : (
        <video
          src={currentMedia.preview}
          className="w-full h-48 object-cover rounded-lg"
          controls
        />
      )}
      <button
        onClick={onRemoveMedia}
        className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
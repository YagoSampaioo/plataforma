import { useState } from 'react';
import { FileAttachment } from '../types/demand';
import { fileService } from '../services/fileService';
import { validateFiles } from '../utils/fileValidation';

export function useFileHandling() {
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    try {
      setUploadError(null);

      // Validate files
      const validation = validateFiles(files, attachments.length);
      if (!validation.valid) {
        setUploadError(validation.error);
        return;
      }

      const demandId = crypto.randomUUID();
      const uploadPromises = files.map(file => fileService.uploadFile(file, demandId));
      const newAttachments = await Promise.all(uploadPromises);
      setAttachments(prev => [...prev, ...newAttachments]);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError('Erro ao fazer upload dos arquivos. Por favor, tente novamente.');
    }
  };

  const handleRemoveAttachment = async (id: string) => {
    try {
      await fileService.deleteFile(id);
      setAttachments(prev => prev.filter(att => att.id !== id));
    } catch (err) {
      console.error('Remove error:', err);
      setUploadError('Erro ao remover arquivo');
    }
  };

  return {
    attachments,
    uploadError,
    handleFilesSelected,
    handleRemoveAttachment,
    setUploadError
  };
}
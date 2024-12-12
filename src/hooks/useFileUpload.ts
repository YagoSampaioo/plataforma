import { useState, useCallback } from 'react';
import { FileAttachment } from '../types/demand';
import { fileService } from '../services/fileService';
import { supabase } from '../lib/supabase';

export function useFileUpload() {
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Sessão expirada. Por favor, faça login novamente.');
    }
  }, []);

  const uploadFiles = async (files: File[], demandId: string) => {
    setIsUploading(true);
    setError(null);

    try {
      await checkAuth();
      
      const uploadPromises = files.map(file => fileService.uploadFile(file, demandId));
      const newAttachments = await Promise.all(uploadPromises);
      setAttachments(prev => [...prev, ...newAttachments]);
      return newAttachments;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer upload dos arquivos';
      setError(message);
      throw new Error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = async (id: string) => {
    try {
      await checkAuth();
      await fileService.deleteFile(id);
      setAttachments(prev => prev.filter(att => att.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao remover arquivo';
      setError(message);
      throw new Error(message);
    }
  };

  const clearAttachments = () => {
    setAttachments([]);
    setError(null);
  };

  return {
    attachments,
    isUploading,
    error,
    uploadFiles,
    removeFile,
    clearAttachments
  };
}
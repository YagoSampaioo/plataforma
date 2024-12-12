import { supabase } from '../lib/supabase';
import { FileAttachment } from '../types/demand';

export const fileService = {
  async uploadFile(file: File, demandId: string): Promise<FileAttachment> {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${demandId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from('demands')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw new Error('Erro ao fazer upload do arquivo');
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('demands')
        .getPublicUrl(fileName);

      return {
        id: fileName,
        filename: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    }
  },

  async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('demands')
        .remove([path]);

      if (error) {
        console.error('Storage delete error:', error);
        throw new Error('Erro ao excluir arquivo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      throw new Error('Erro ao excluir arquivo. Por favor, tente novamente.');
    }
  }
};
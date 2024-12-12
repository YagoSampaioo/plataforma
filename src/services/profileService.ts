import { supabase } from '../lib/supabase';
import { User } from '../types/user';

export const profileService = {
  async updateAvatar(userId: string, file: File, role: 'cliente' | 'funcionario'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatars/${userId}-${Date.now()}.${fileExt}`;

      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Erro ao fazer upload da imagem');
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from(role === 'funcionario' ? 'employees' : 'clients')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error('Erro ao atualizar perfil');
      }

      return publicUrl;
    } catch (error) {
      console.error('Profile service error:', error);
      throw error;
    }
  },

  async updatePassword(
    userId: string, 
    currentPassword: string, 
    newPassword: string,
    role: 'cliente' | 'funcionario'
  ): Promise<void> {
    try {
      // First verify current password
      const { data: user, error: verifyError } = await supabase
        .from(role === 'funcionario' ? 'employees' : 'clients')
        .select('id')
        .eq('id', userId)
        .eq('password', currentPassword)
        .single();

      if (verifyError || !user) {
        throw new Error('Senha atual incorreta');
      }

      // Update password
      const { error } = await supabase
        .from(role === 'funcionario' ? 'employees' : 'clients')
        .update({ password: newPassword })
        .eq('id', userId);

      if (error) {
        console.error('Password update error:', error);
        throw new Error('Erro ao atualizar senha');
      }
    } catch (error) {
      console.error('Profile service error:', error);
      throw error;
    }
  }
};
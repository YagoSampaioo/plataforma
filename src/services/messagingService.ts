import { supabase } from '../lib/supabase';

interface Contact {
  name: string;
  phone: string;
}

interface SendMassMessageParams {
  userId: string;
  userName: string;
  team: string;
  message: string;
  contacts: Contact[];
  media?: {
    file: File;
    type: 'image' | 'video';
  };
}

export const messagingService = {
  async uploadMedia(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `whatsapp-media/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Media upload error:', error);
      throw new Error('Erro ao fazer upload da mídia');
    }
  },

  async sendMassMessage(params: SendMassMessageParams) {
    try {
      let mediaUrl: string | undefined;

      if (params.media) {
        mediaUrl = await this.uploadMedia(params.media.file);
      }

      // Store the message campaign in Supabase
      const { data, error } = await supabase
        .from('whatsapp_campaigns')
        .insert([{
          user_id: params.userId,
          user_name: params.userName,
          team: params.team,
          message: params.message,
          contacts: params.contacts,
          media_url: mediaUrl,
          media_type: params.media?.type,
          status: 'pending',
          total_contacts: params.contacts.length,
          sent_count: 0
        }])
        .select()
        .single();

      if (error) throw error;

      // Trigger n8n webhook to process the campaign
      const response = await fetch('https://n8n.assessorialpha.com/webhook-test/783afd9c-67e3-4ac6-813e-c1fa117c7aa9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: data.id,
          message: params.message,
          contacts: params.contacts,
          mediaUrl,
          mediaType: params.media?.type
        })
      });

      if (!response.ok) {
        throw new Error('Failed to trigger message processing');
      }

      return data;
    } catch (error) {
      console.error('Messaging service error:', error);
      throw error;
    }
  }
};
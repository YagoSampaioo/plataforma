import React, { useState, useEffect } from 'react';
import { Send, Upload, AlertCircle, MessageSquare, Users, Image, Film, Save, List } from 'lucide-react';
import { BackButton } from '../navigation/BackButton';
import { useAuthStore } from '../../store/authStore';
import { messagingService } from '../../services/messagingService';
import { leadService } from '../../services/leadService';
import { FileUpload } from '../FileUpload';
import { MediaUpload } from './MediaUpload';
import { WhatsAppPreview } from './WhatsAppPreview';
import { SaveLeadDialog } from './SaveLeadDialog';
import { LeadSelector } from './LeadSelector';
import { Contact } from '../../types/lead';
import { useLocation, useNavigate } from 'react-router-dom';

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export function WhatsAppMessaging() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isLeadSelectorOpen, setLeadSelectorOpen] = useState(false);

  useEffect(() => {
    // Check for selected contacts from LeadsPanel
    const selectedContacts = location.state?.selectedContacts;
    if (selectedContacts) {
      setContacts(selectedContacts);
    }
  }, [location.state]);

  const handleFileUpload = async (files: File[]) => {
    try {
      const text = await files[0].text();
      const rows = text.split('\n');
      const parsedContacts: Contact[] = rows
        .map(row => {
          const [name, phone] = row.split(',').map(item => item.trim());
          return phone ? { name: name || 'Sem nome', phone } : null;
        })
        .filter((contact): contact is Contact => contact !== null);

      setContacts(parsedContacts);
    } catch (err) {
      setError('Erro ao processar arquivo de contatos');
    }
  };

  const handleMediaSelected = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const preview = URL.createObjectURL(file);
    setMedia({
      file,
      preview,
      type: isVideo ? 'video' : 'image'
    });
  };

  const handleRemoveMedia = () => {
    if (media?.preview) {
      URL.revokeObjectURL(media.preview);
    }
    setMedia(null);
  };

  const handleSaveLead = async (name: string, description: string) => {
    if (!user) return;

    try {
      await leadService.createLead(user.id, {
        name,
        description,
        contacts
      });
      setSaveDialogOpen(false);
      setSuccess('Lista de contatos salva com sucesso!');
    } catch (err) {
      console.error('Error saving lead:', err);
      setError('Erro ao salvar lista de contatos');
    }
  };

  const handleLeadSelect = (lead: Lead) => {
    setContacts(lead.contacts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await messagingService.sendMassMessage({
        userId: user.id,
        userName: user.name,
        team: user.team || 'default',
        message,
        contacts,
        media: media ? {
          file: media.file,
          type: media.type
        } : undefined
      });
      setSuccess('Mensagens enviadas com sucesso!');
      setMessage('');
      setContacts([]);
      handleRemoveMedia();
    } catch (err) {
      setError('Erro ao enviar mensagens');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-8">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ffb400 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Envio em Massa - WhatsApp
            </h2>
            <p className="mt-2 text-gray-400">Envie mensagens para múltiplos contatos via WhatsApp</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Contatos (CSV)
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setLeadSelectorOpen(true)}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-ffb400 hover:text-ffb400/80 transition-colors"
                  >
                    <List className="h-4 w-4 mr-1" />
                    Usar Lista Salva
                  </button>
                  {contacts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSaveDialogOpen(true)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-ffb400 hover:text-ffb400/80 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Salvar Lista
                    </button>
                  )}
                </div>
              </div>
              <FileUpload
                onFilesSelected={handleFileUpload}
                attachments={[]}
                onRemoveAttachment={() => {}}
                maxFiles={1}
              />
              {contacts.length > 0 && (
                <div className="mt-2 p-4 bg-dark-300/50 rounded-lg border border-ffb400/10">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{contacts.length} contatos carregados</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    {contacts.map((contact, index) => (
                      <div key={index} className="text-sm text-gray-400">
                        {contact.name}: {contact.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Imagem
                </label>
                <MediaUpload
                  onFileSelected={handleMediaSelected}
                  currentMedia={media?.type === 'image' ? media : null}
                  onRemoveMedia={handleRemoveMedia}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5MB
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Film className="h-4 w-4 mr-2" />
                  Vídeo
                </label>
                <MediaUpload
                  onFileSelected={handleMediaSelected}
                  currentMedia={media?.type === 'video' ? media : null}
                  onRemoveMedia={handleRemoveMedia}
                  accept="video/*"
                  maxSize={16 * 1024 * 1024} // 16MB
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mensagem
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                placeholder="Digite sua mensagem..."
                required
              />
            </div>

            {/* WhatsApp Preview */}
            {(message || media) && (
              <div>
                <h3 className="text-lg font-medium text-ffb400 mb-3">Preview</h3>
                <WhatsAppPreview 
                  message={message}
                  media={media ? {
                    preview: media.preview,
                    type: media.type
                  } : undefined}
                />
              </div>
            )}

            {error && (
              <div className="flex items-center p-4 bg-red-900/30 border border-red-500/30 rounded-md text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center p-4 bg-green-900/30 border border-green-500/30 rounded-md text-green-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || contacts.length === 0}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span className="ml-2">Enviando...</span>
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensagens ({contacts.length})
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Save Lead Dialog */}
      <SaveLeadDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSaveLead}
        contactsCount={contacts.length}
      />

      {/* Lead Selector */}
      <LeadSelector
        userId={user.id}
        onSelect={handleLeadSelect}
        isOpen={isLeadSelectorOpen}
        onClose={() => setLeadSelectorOpen(false)}
      />
    </div>
  );
}
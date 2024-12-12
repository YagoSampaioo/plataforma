import React from 'react';
import { Check, Clock } from 'lucide-react';

interface WhatsAppPreviewProps {
  message: string;
  media?: {
    preview: string;
    type: 'image' | 'video';
  };
}

export function WhatsAppPreview({ message, media }: WhatsAppPreviewProps) {
  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10">
      {/* Mobile frame */}
      <div className="max-w-[320px] mx-auto">
        {/* Phone status bar */}
        <div className="bg-dark-300/50 px-4 py-2 rounded-t-lg border-b border-ffb400/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">12:00</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-ffb400/20"></div>
              <div className="w-3 h-3 rounded-full bg-ffb400/20"></div>
              <div className="w-3 h-3 rounded-full bg-ffb400/20"></div>
            </div>
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="bg-dark-300/50 px-4 py-3 border-b border-ffb400/10">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-ffb400/20 flex items-center justify-center">
              <span className="text-ffb400 text-sm font-semibold">C</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Contato</p>
              <p className="text-xs text-gray-400">online</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="p-4 min-h-[300px] bg-dark-200/30">
          {/* System message */}
          <div className="flex justify-center mb-4">
            <div className="bg-dark-300/50 px-3 py-1 rounded-full">
              <span className="text-xs text-gray-400">HOJE</span>
            </div>
          </div>

          {/* Message bubbles */}
          <div className="space-y-2">
            {/* Received message example */}
            <div className="max-w-[80%]">
              <div className="bg-dark-300/50 text-white rounded-lg p-2 text-sm">
                Olá! 👋
              </div>
            </div>

            {/* Sent message with media and/or text */}
            <div className="flex flex-col items-end space-y-1">
              {media && (
                <div className="max-w-[80%] rounded-lg overflow-hidden bg-ffb400/10">
                  {media.type === 'image' ? (
                    <img
                      src={media.preview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={media.preview}
                      className="w-full h-48 object-cover"
                      controls
                    />
                  )}
                </div>
              )}
              
              {message && (
                <div className="max-w-[80%] bg-ffb400/10 text-white rounded-lg p-2 relative">
                  <p className="text-sm whitespace-pre-wrap break-words pr-12">
                    {message}
                  </p>
                  <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                    <span className="text-[10px] text-gray-400">12:00</span>
                    <Check className="h-3 w-3 text-ffb400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="bg-dark-300/50 px-4 py-3 rounded-b-lg border-t border-ffb400/10">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-xs text-gray-400">
              Será enviado para {0} contatos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
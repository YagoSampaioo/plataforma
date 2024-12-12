import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Settings, Key, Upload, Save } from 'lucide-react';
import { profileService } from '../../services/profileService';
import { BackButton } from '../navigation/BackButton';

export function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) return;

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    try {
      await profileService.updatePassword(user.id, currentPassword, newPassword, user.role);
      setSuccess('Senha atualizada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Erro ao atualizar senha. Verifique sua senha atual.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const newAvatarUrl = await profileService.updateAvatar(user.id, file, user.role);
      updateUser({ ...user, avatarUrl: newAvatarUrl });
      setSuccess('Foto de perfil atualizada com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar foto de perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Gradient effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative">
            <div className="mb-6">
              <BackButton />
            </div>
            
            <div className="flex items-center mb-8">
              <Settings className="h-8 w-8 text-ffb400 mr-3" />
              <h1 className="text-2xl font-semibold text-ffb400">Configurações</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Password Change Section */}
              <div className="bg-dark-200/40 backdrop-blur-sm p-6 rounded-lg border border-ffb400/10">
                <h2 className="text-xl font-medium text-ffb400 mb-6 flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Alterar Senha
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400 disabled:opacity-50"
                  >
                    {isLoading ? 'Atualizando...' : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Atualizar Senha
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Profile Picture Section */}
              <div className="bg-dark-200/40 backdrop-blur-sm p-6 rounded-lg border border-ffb400/10">
                <h2 className="text-xl font-medium text-ffb400 mb-6 flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Foto de Perfil
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FFB400&color=000`}
                        alt="Profile"
                        className="h-32 w-32 rounded-full object-cover border-2 border-ffb400/30"
                      />
                      <label className="absolute bottom-0 right-0 bg-ffb400 rounded-full p-2 cursor-pointer hover:bg-ffb400/90 transition-colors">
                        <Upload className="h-4 w-4 text-black" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    Clique no ícone para alterar sua foto de perfil
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-md text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-4 bg-green-900/50 border border-green-500/50 rounded-md text-green-400">
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
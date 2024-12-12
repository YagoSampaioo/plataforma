export interface FileValidationOptions {
  maxSize?: number;
  maxFiles?: number;
  allowedTypes?: string[];
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFiles(
  files: File[],
  currentCount: number,
  options: FileValidationOptions = {}
): ValidationResult {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    maxFiles = 5,
    allowedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx']
  } = options;

  if (files.length + currentCount > maxFiles) {
    return {
      valid: false,
      error: `Número máximo de arquivos (${maxFiles}) excedido`
    };
  }

  for (const file of files) {
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `${file.name} excede o tamanho máximo de ${formatFileSize(maxSize)}`
      };
    }

    const isValidType = allowedTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.replace('*', ''));
      }
      return file.type === type || file.name.endsWith(type);
    });

    if (!isValidType) {
      return {
        valid: false,
        error: `${file.name} não é um tipo de arquivo permitido`
      };
    }
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
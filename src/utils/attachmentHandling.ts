import { FileAttachment } from '../types/demand';

export function parseAttachments(attachmentsString: string | null | FileAttachment[]): FileAttachment[] {
  if (!attachmentsString) return [];
  
  try {
    // Handle already parsed objects
    if (Array.isArray(attachmentsString)) {
      return attachmentsString;
    }

    // Handle string input
    if (typeof attachmentsString === 'string') {
      try {
        const parsed = JSON.parse(attachmentsString);
        return Array.isArray(parsed) ? parsed : [];
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return [];
      }
    }

    return [];
  } catch (err) {
    console.error('Error parsing attachments:', err);
    return [];
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
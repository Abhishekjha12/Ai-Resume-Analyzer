/**
 * Converts a file size in bytes to a human-readable string.
 * Examples:
 *  - 1536 → "1.50 KB"
 *  - 1048576 → "1.00 MB"
 *  - 1073741824 → "1.00 GB"
 */
export function formatSize(bytes: number): string {
  if (isNaN(bytes) || bytes < 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
}


export const generateUUID = ()=>crypto.randomUUID();
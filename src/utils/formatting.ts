export const formatDate = (dateString?: string): string => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  } catch {
    return dateString;
  }
};

export const formatTime = (timestamp?: string): string => {
  if (!timestamp) return "—";
  try {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return timestamp;
  }
};
export function formatDate(ms: number) {
    return new Date(ms).toLocaleString();
  }
  
  export function nowMs() {
    return Date.now();
  }
export function timeSince(date: Date) {
  const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " y";
  
  interval = seconds / 2592000;

  if (interval > 1) return Math.floor(interval) + " months";
  
  interval = seconds / 86400;

  if (interval > 1) return Math.floor(interval) + " d";
  
  interval = seconds / 3600;

  if (interval > 1) return Math.floor(interval) + " h";
  
  interval = seconds / 60;

  if (interval > 1) return Math.floor(interval) + " m";
  
  return Math.floor(seconds) + " seconds";
}
import { useEffect } from "react";

export function useWebSocket(listeners: { event: string, callback: (data: any) => void }[]) {
  useEffect(() => {
    const uri = process.env.NEXT_PUBLIC_SOCKET_URL;

    if(uri) {
      const ws = new WebSocket(uri);
  
      ws.onopen = () => console.log('[server] connected');
      ws.onclose = () => console.log('[server] disconnected');
      ws.onmessage = (event: { data: string }) => {
        const messageData = JSON.parse(event.data);
  
        listeners.forEach(({ event, callback }) => {
          if (event === messageData.event) {
            callback(messageData.data)
          }
        })
      };
  
      return () => { ws.close(); };
    }
  }, [listeners])
}
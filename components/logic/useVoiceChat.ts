import { useCallback } from "react";

export const useVoiceChat = () => {
  // Iniciar chat de voz
  const startVoiceChat = useCallback(
    async (token: string, sessionId: string) => {
      await fetch("https://api.heygen.com/v1/streaming.push_to_talk_start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
    },
    []
  );

  // Detener chat de voz
  const stopVoiceChat = useCallback(
    async (token: string, sessionId: string) => {
      await fetch("https://api.heygen.com/v1/streaming.push_to_talk_stop", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
    },
    []
  );

  return {
    startVoiceChat,
    stopVoiceChat,
  };
};

import { useCallback, useState } from "react";

export const useVoiceChat = () => {
  const [isVoiceChatLoading, setIsVoiceChatLoading] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);

  // Iniciar chat de voz
  const startVoiceChat = useCallback(async (token: string, sessionId: string) => {
    try {
      setIsVoiceChatLoading(true);
      await fetch("https://api.heygen.com/v1/streaming.push_to_talk_start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      setIsVoiceChatActive(true);
    } catch (error) {
      console.error("Error starting voice chat:", error);
    } finally {
      setIsVoiceChatLoading(false);
    }
  }, []);

  // Detener chat de voz
  const stopVoiceChat = useCallback(async (token: string, sessionId: string) => {
    try {
      setIsVoiceChatLoading(true);
      await fetch("https://api.heygen.com/v1/streaming.push_to_talk_stop", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      setIsVoiceChatActive(false);
    } catch (error) {
      console.error("Error stopping voice chat:", error);
    } finally {
      setIsVoiceChatLoading(false);
    }
  }, []);

  return {
    startVoiceChat,
    stopVoiceChat,
    isVoiceChatLoading,
    isVoiceChatActive,
  };
};

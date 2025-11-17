import { useCallback, useState } from "react";
import {
  StreamingAvatarSessionState,
  useStreamingAvatarContext,
} from "./context";
import { useVoiceChat } from "./useVoiceChat";
import { useMessageHistory } from "./useMessageHistory";

export const useStreamingAvatarSession = () => {
  const {
    avatarRef,
    basePath,
    sessionState,
    setSessionState,
    stream,
    setStream,
    setIsListening,
    setIsUserTalking,
    setIsAvatarTalking,
    setConnectionQuality,
    handleUserTalkingMessage,
    handleStreamingTalkingMessage,
    handleEndMessage,
    clearMessages,
  } = useStreamingAvatarContext();
  const { stopVoiceChat } = useVoiceChat();

  useMessageHistory();

  const [sessionId, setSessionId] = useState<string | null>(null);

  // Inicializa WebSocket con el token
  const init = useCallback(
    (token: string) => {
      const ws = new WebSocket(
        `wss://api.heygen.com/v1/streaming.ws?token=${token}`
      );

      ws.onopen = () => {
        console.log("WebSocket conectado");
        setSessionState(StreamingAvatarSessionState.CONNECTING);
      };

      ws.onclose = () => {
        console.log("WebSocket cerrado");
        setSessionState(StreamingAvatarSessionState.INACTIVE);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Mensaje WS:", data);

          if (data.type === "session_created") {
            setSessionId(data.session_id);
            setSessionState(StreamingAvatarSessionState.CONNECTED);
          }

          // TODO: procesar chunks de audio/video y pasarlos a setStream
        } catch (err) {
          console.error("Error parseando mensaje WS:", err);
        }
      };

      avatarRef.current = ws;
      return ws;
    },
    [avatarRef, setSessionState, setStream]
  );

  const stop = useCallback(async () => {
    clearMessages();
    stopVoiceChat();
    setIsListening(false);
    setIsUserTalking(false);
    setIsAvatarTalking(false);
    setStream(null);

    if (avatarRef.current) {
      (avatarRef.current as WebSocket).close();
    }

    setSessionState(StreamingAvatarSessionState.INACTIVE);
    setSessionId(null);
  }, [
    avatarRef,
    clearMessages,
    stopVoiceChat,
    setIsListening,
    setIsUserTalking,
    setIsAvatarTalking,
    setStream,
    setSessionState,
  ]);

  // Enviar texto al avatar vía REST API
  const sendText = useCallback(
    async (token: string, text: string) => {
      if (!sessionId) {
        throw new Error("No hay sessionId activo");
      }
      await fetch("https://api.heygen.com/v1/streaming.input_text", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, session_id: sessionId }),
      });
    },
    [sessionId]
  );

  return {
    avatarRef,
    sessionState,
    stream,
    initAvatar: init,
    stopAvatar: stop,
    sendText,
    sessionId,
  };
};

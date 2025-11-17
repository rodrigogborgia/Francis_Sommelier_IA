import { useCallback } from "react";
import { useStreamingAvatarContext } from "./context";

export const useTextChat = () => {
  const { avatarRef, sessionId } = useStreamingAvatarContext();

  const sendMessage = useCallback(
    (message: string) => {
      if (!avatarRef.current || !sessionId) return;
      try {
        avatarRef.current.send(
          JSON.stringify({
            type: "input_text",
            text: message,
            session_id: sessionId,
            mode: "ASYNC", // antes TaskMode.ASYNC
          })
        );
      } catch (err) {
        console.error("Error enviando mensaje async:", err);
      }
    },
    [avatarRef, sessionId]
  );

  const sendMessageSync = useCallback(
    async (message: string) => {
      if (!avatarRef.current || !sessionId) return;
      try {
        avatarRef.current.send(
          JSON.stringify({
            type: "input_text",
            text: message,
            session_id: sessionId,
            mode: "SYNC", // antes TaskMode.SYNC
          })
        );
      } catch (err) {
        console.error("Error enviando mensaje sync:", err);
      }
    },
    [avatarRef, sessionId]
  );

  const repeatMessage = useCallback(
    (message: string) => {
      if (!avatarRef.current || !sessionId) return;
      try {
        avatarRef.current.send(
          JSON.stringify({
            type: "input_text",
            text: message,
            session_id: sessionId,
            mode: "ASYNC",
            repeat: true, // antes TaskType.REPEAT
          })
        );
      } catch (err) {
        console.error("Error enviando repeat async:", err);
      }
    },
    [avatarRef, sessionId]
  );

  const repeatMessageSync = useCallback(
    async (message: string) => {
      if (!avatarRef.current || !sessionId) return;
      try {
        avatarRef.current.send(
          JSON.stringify({
            type: "input_text",
            text: message,
            session_id: sessionId,
            mode: "SYNC",
            repeat: true,
          })
        );
      } catch (err) {
        console.error("Error enviando repeat sync:", err);
      }
    },
    [avatarRef, sessionId]
  );

  return {
    sendMessage,
    sendMessageSync,
    repeatMessage,
    repeatMessageSync,
  };
};

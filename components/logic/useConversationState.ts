import { useCallback } from "react";

import { useStreamingAvatarContext } from "./context";

export const useConversationState = () => {
  const { avatarRef, isAvatarTalking, isUserTalking, isListening } =
    useStreamingAvatarContext();

const startListening = useCallback(() => {
  if (!avatarRef.current) return;
  // ❌ Esto no existe en WebSocket nativo:
  // avatarRef.current.startListening();

  // ✅ En su lugar, podés mandar un mensaje al WS si HeyGen lo soporta:
  avatarRef.current.send(JSON.stringify({ type: "start_listening" }));
}, [avatarRef]);

const stopListening = useCallback(() => {
  if (!avatarRef.current) return;
  // ❌ Esto tampoco existe:
  // avatarRef.current.stopListening();

  // ✅ Igual que arriba, mandás un mensaje al WS:
  avatarRef.current.send(JSON.stringify({ type: "stop_listening" }));
}, [avatarRef]);


  return {
    isAvatarListening: isListening,
    startListening,
    stopListening,
    isUserTalking,
    isAvatarTalking,
  };
};

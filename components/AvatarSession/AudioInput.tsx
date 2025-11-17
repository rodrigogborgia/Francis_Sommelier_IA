// components/AvatarSession/AudioInput.tsx
import React from "react";
import { useVoiceChat } from "../logic/useVoiceChat";
import { useStreamingAvatarContext } from "../logic/context";

export const AudioInput: React.FC = () => {
  const { isVoiceChatLoading } = useVoiceChat();
  const { isUserTalking } = useStreamingAvatarContext();

  return (
    <div className="flex flex-col items-center">
      {isVoiceChatLoading ? (
        <p className="text-gray-400">Cargando chat de voz...</p>
      ) : (
        <p className="text-gray-200">
          {isUserTalking ? "🎤 Usuario hablando..." : "Micrófono activo"}
        </p>
      )}
    </div>
  );
};

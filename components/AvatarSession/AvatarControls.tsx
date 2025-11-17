import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import React, { useState } from "react";

import { useVoiceChat } from "../logic/useVoiceChat";
import { Button } from "../Button";
import { useInterrupt } from "../logic/useInterrupt";

import { AudioInput } from "./AudioInput";

export const AvatarControls: React.FC<{ onSendMessage: (msg: string) => void }> = ({ onSendMessage }) => {
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
    startVoiceChat,
    stopVoiceChat,
  } = useVoiceChat();
  const { interrupt } = useInterrupt();

  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-3 relative w-full items-center">
      {/* Toggle entre Voice y Text */}
      <ToggleGroup
        className={`bg-zinc-700 rounded-lg p-1 ${isVoiceChatLoading ? "opacity-50" : ""}`}
        disabled={isVoiceChatLoading}
        type="single"
        value={isVoiceChatActive ? "voice" : "text"}
        onValueChange={(value) => {
          if (value === "voice" && !isVoiceChatActive && !isVoiceChatLoading) {
            // ⚡ Iniciar chat de voz
            // Ojo: acá deberías pasar token y sessionId desde el padre
            // startVoiceChat(token, sessionId);
          } else if (value === "text" && isVoiceChatActive && !isVoiceChatLoading) {
            // ⚡ Detener chat de voz
            // stopVoiceChat(token, sessionId);
          }
        }}
      >
        <ToggleGroupItem
          className="data-[state=on]:bg-zinc-800 rounded-lg p-2 text-sm w-[90px] text-center"
          value="voice"
        >
          Voice Chat
        </ToggleGroupItem>
        <ToggleGroupItem
          className="data-[state=on]:bg-zinc-800 rounded-lg p-2 text-sm w-[90px] text-center"
          value="text"
        >
          Text Chat
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Mostrar AudioInput si está activo o cargando */}
      {isVoiceChatActive || isVoiceChatLoading ? (
        <AudioInput />
      ) : (
        <div className="flex gap-2 w-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 border rounded px-2"
          />
          <Button
            onClick={() => {
              if (text.trim()) {
                onSendMessage(text.trim());
                setText("");
              }
            }}
          >
            Enviar
          </Button>
        </div>
      )}

      {/* Botón de interrupción */}
      <div className="absolute top-[-70px] right-3">
        <Button className="!bg-zinc-700 !text-white" onClick={interrupt}>
          Interrupt
        </Button>
      </div>
    </div>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const BAR_COUNT = 16;

export function AudioVisualizer() {
  const [frequencies, setFrequencies] = useState(() =>
    new Array(BAR_COUNT * 2).fill(0),
  );
  const [isMicOn, setIsMicOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationId = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = BAR_COUNT * 2;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      streamRef.current = stream;
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      setIsMicOn(true);
      animateBars();
    } catch (err) {
      console.error("Mic error:", err);
      setError("Could not access microphone.");
    }
  };

  const stopMic = () => {
    const stream = streamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    audioCtxRef.current?.close();
    if (animationId.current) cancelAnimationFrame(animationId.current);
    setIsMicOn(false);
  };

  const animateBars = () => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!analyser || !dataArray) return;

    const render = () => {
      analyser.getByteFrequencyData(dataArray);

      const slice = dataArray.slice(0, BAR_COUNT);
      const combined = new Array(BAR_COUNT * 2);
      for (let i = 0; i < BAR_COUNT; i++) {
        combined[i] = slice[BAR_COUNT - 1 - i];
        combined[i + BAR_COUNT] = slice[i];
      }

      setFrequencies(combined);
      animationId.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-1 h-32 w-fit">
          {frequencies.map((v, i) => (
            <motion.div
              key={i}
              animate={{ height: `${(v / 255) * 100}%` }}
              transition={{ duration: 0.2 }}
              className="w-1 bg-primary/90 rounded"
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={isMicOn ? stopMic : startMic}
          size="icon"
          className="rounded-full cursor-pointer"
        >
          {isMicOn ? <MicOff /> : <Mic />}
        </Button>
      </div>
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
}

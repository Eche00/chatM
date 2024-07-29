import { useState, useRef } from "react";

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  // == Start recording audio
  const startRecording = async () => {
    try {
      // Request audio permission and get media stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const audioChunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        // Create a blob from the recorded audio chunks
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing audio devices:", error);
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    setAudioBlob,
  };
};

export default useAudioRecorder;

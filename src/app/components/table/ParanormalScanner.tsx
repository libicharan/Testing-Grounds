"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

export default function ParanormalScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activityLevel, setActivityLevel] = useState<number | null>(null);
  const [status, setStatus] = useState("Initializing...");

  // Load models once
  useEffect(() => {
    const loadModels = async () => {
      try {
        setStatus("Loading models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setStatus("Models loaded. Starting camera...");
        startVideo();
      } catch (err) {
        setStatus("Model loading failed");
        console.error(err);
      }
    };

    loadModels();
  }, []);

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        setStatus("Camera access denied");
        console.error("Camera error:", err);
      });
  };

  // Detect faces and update "ghost activity"
  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        videoRef.current &&
        videoRef.current.readyState === 4 // fully loaded
      ) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        );

        if (detections.length > 0) {
          // Simulate ghost activity level
          const level = Math.floor(Math.random() * 101); // 0–100
          setActivityLevel(level);
          setStatus(`Ghost Activity Level: ${level}`);
        } else {
          setActivityLevel(null);
          setStatus("No face detected...");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">👻 Paranormal Activity Scanner</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="480"
        height="360"
        style={{ border: "2px solid lime", borderRadius: "12px" }}
      />
      <p className="mt-4 text-lg">{status}</p>
      {activityLevel !== null && (
        <div className="mt-2 text-2xl text-red-600 font-semibold">
          {activityLevel > 80
            ? "🔥 Extreme Activity!"
            : activityLevel > 50
              ? "😨 High Activity"
              : "😐 Moderate Activity"}
        </div>
      )}
    </div>
  );
}

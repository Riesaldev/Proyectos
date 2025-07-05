"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Sword from "../../../public/videos/Sword.webm";

export default function Page() {
  const [videoSpeed, setVideoSpeed] = useState(0.6);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("canplaythrough", () => {
        setVideoLoaded(true);
      });
      video.addEventListener("ended", () => {
        setIsEnded(true);
      });
    }
    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", () => {});
        video.removeEventListener("ended", () => {});
      }
    };
  }, []);


  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover"
          ref={videoRef}
        >
          <source src={Sword} type="video/webm" />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
      <div className="opacity-80">
        <Header />
      </div>
    </div>
  );
}

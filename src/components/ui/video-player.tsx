"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  thumbnailSrc: string;
  videoSrc: string;
  aspectRatio?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  thumbnailSrc,
  videoSrc,
  aspectRatio = "16/9",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full" style={{ aspectRatio }}>
      {!isPlaying && (
        <>
          <Image
            src={thumbnailSrc}
            alt="Video thumbnail"
            layout="fill"
            objectFit="cover"
            className=""
          />
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-40 "
          >
            <div className="rounded-full bg-background border border-primary p-5">
              <Play className="w-12 h-12 md:w-8 md:h-8 text-white" />
            </div>
          </button>
        </>
      )}
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full  ${
          isPlaying ? "block" : "hidden"
        }`}
        controls={isPlaying}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

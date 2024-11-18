import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { createPortal } from "react-dom";

interface VideoPlayerProps {
  thumbnailSrc: string;
  videoSrc: string;
  aspectRatio?: string;
}

const preventDefault = (e: Event) => e.preventDefault();

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('wheel', preventDefault, { passive: false });
  document.addEventListener('touchmove', preventDefault, { passive: false });
};

const enableScroll = () => {
  document.body.style.overflow = '';
  document.removeEventListener('wheel', preventDefault);
  document.removeEventListener('touchmove', preventDefault);
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  thumbnailSrc,
  videoSrc,
  aspectRatio = "16/9",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handlePlayClick = () => {
    setIsModalOpen(true);
    disableScroll();
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
    enableScroll();
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    return () => {
      enableScroll();
    };
  }, []);

  return (
    <>
      <div className="relative w-full" style={{ aspectRatio }}>
        <Image
          src={thumbnailSrc}
          alt="Video thumbnail"
          layout="fill"
          objectFit="cover"
          className=""
        />
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 hover:bg-opacity-40"
        >
          <div className="rounded-full bg-background border border-primary p-5">
            <Play className="w-12 h-12 md:w-8 md:h-8 text-white" />
          </div>
        </button>
      </div>

      {isModalOpen &&
        isMounted &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center overflow-hidden"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-[94%] md:w-[75%] aspect-video">
              <button
                onClick={handleCloseModal}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

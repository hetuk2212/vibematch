"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: Record<string, unknown>) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YTPlayerInstance = {
  loadVideoById: (videoId: string) => void;
  cueVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

export const YT_PLAYER_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 } as const;

const MOUNT_ID = "vibe-yt-player";

type YouTubePlayerContextValue = {
  isReady: boolean;
  activeVideoId: string | null;
  playerState: number;
  currentTime: number;
  duration: number;
  loadVideo: (videoId: string, autoplay: boolean) => void;
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
};

const YouTubePlayerContext = createContext<YouTubePlayerContextValue | null>(null);

export function YouTubePlayerProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const queueRef = useRef<Array<() => void>>([]);
  const initializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<number>(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Guard against React Strict Mode's mount→cleanup→mount dance in dev: this
    // provider must only ever create ONE persistent YT.Player for the app's lifetime.
    if (initializedRef.current) return;
    initializedRef.current = true;

    function createPlayer() {
      playerRef.current = new window.YT!.Player(MOUNT_ID, {
        height: "68",
        width: "120",
        playerVars: { playsinline: 1, rel: 0 },
        events: {
          onReady: () => {
            setIsReady(true);
            const queued = queueRef.current;
            queueRef.current = [];
            queued.forEach((fn) => fn());
          },
          onStateChange: (event: { data: number }) => {
            setPlayerState(event.data);
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      createPlayer();
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const time = player.getCurrentTime();
      const dur = player.getDuration();
      if (Number.isFinite(time)) setCurrentTime(time);
      if (Number.isFinite(dur) && dur > 0) setDuration(dur);
    }, 500);
    return () => clearInterval(interval);
  }, [isReady]);

  function runOrQueue(fn: () => void) {
    if (isReady && playerRef.current) fn();
    else queueRef.current.push(fn);
  }

  function loadVideo(videoId: string, autoplay: boolean) {
    setActiveVideoId(videoId);
    setCurrentTime(0);
    setDuration(0);
    runOrQueue(() => {
      if (autoplay) playerRef.current!.loadVideoById(videoId);
      else playerRef.current!.cueVideoById(videoId);
    });
  }

  function play() {
    runOrQueue(() => playerRef.current!.playVideo());
  }

  function pause() {
    runOrQueue(() => playerRef.current!.pauseVideo());
  }

  function seekTo(seconds: number) {
    runOrQueue(() => playerRef.current!.seekTo(seconds, true));
  }

  return (
    <YouTubePlayerContext.Provider
      value={{ isReady, activeVideoId, playerState, currentTime, duration, loadVideo, play, pause, seekTo }}
    >
      <div className="vibe-yt-mount">
        <div id={MOUNT_ID} />
      </div>
      {children}
    </YouTubePlayerContext.Provider>
  );
}

export function useYouTubePlayer() {
  const ctx = useContext(YouTubePlayerContext);
  if (!ctx) throw new Error("useYouTubePlayer must be used within YouTubePlayerProvider");
  return ctx;
}

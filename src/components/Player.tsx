"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Category } from "@/data/categories";
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./icons";
import { YT_PLAYER_STATE, useYouTubePlayer } from "./YouTubePlayerProvider";

export default function Player({ category }: { category: Category }) {
  const yt = useYouTubePlayer();
  const [trackIndex, setTrackIndex] = useState(0);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const track = category.tracks[trackIndex];
  const trackCount = category.tracks.length;
  const coverSrc = `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`;

  const isCurrentLoaded = yt.activeVideoId === track.youtubeId;
  const isPlaying = isCurrentLoaded && yt.playerState === YT_PLAYER_STATE.PLAYING;
  const currentTime = isCurrentLoaded ? yt.currentTime : 0;
  const duration = isCurrentLoaded ? yt.duration : 0;

  // New room: reset to the first track and cue it (no autoplay) so the user still has to press play.
  useEffect(() => {
    setTrackIndex(0);
    yt.loadVideo(category.tracks[0].youtubeId, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.slug]);

  // Auto-advance when the currently loaded track finishes, looping the playlist.
  useEffect(() => {
    if (isCurrentLoaded && yt.playerState === YT_PLAYER_STATE.ENDED) {
      changeTrack((trackIndex + 1) % trackCount, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yt.playerState]);

  function changeTrack(newIndex: number, autoplay: boolean) {
    setTrackIndex(newIndex);
    yt.loadVideo(category.tracks[newIndex].youtubeId, autoplay);
  }

  function togglePlay() {
    if (!isCurrentLoaded) {
      yt.loadVideo(track.youtubeId, true);
    } else if (yt.playerState === YT_PLAYER_STATE.PLAYING) {
      yt.pause();
    } else {
      yt.play();
    }
  }

  function goToPrev() {
    changeTrack((trackIndex - 1 + trackCount) % trackCount, isPlaying);
  }

  function goToNext() {
    changeTrack((trackIndex + 1) % trackCount, isPlaying);
  }

  function handleSeekClick(e: MouseEvent<HTMLDivElement>) {
    const el = progressTrackRef.current;
    if (!el || duration <= 0) return;
    const rect = el.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    yt.seekTo(fraction * duration);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="vibe-player-bar">
      <div
        ref={progressTrackRef}
        className="vibe-bar-progress-track"
        onClick={handleSeekClick}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div className="vibe-bar-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="vibe-bar-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverSrc} alt="" className="vibe-bar-cover" />

        <div className="vibe-bar-info">
          <div className="vibe-bar-title">{track.title}</div>
          <div className="vibe-bar-artist">{track.artist}</div>
          <div className="vibe-bar-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="vibe-bar-controls">
          <button type="button" className="vibe-bar-skip" onClick={goToPrev} aria-label="Previous track">
            <PrevIcon />
          </button>
          <button
            type="button"
            className="vibe-bar-play"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          </button>
          <button type="button" className="vibe-bar-skip" onClick={goToNext} aria-label="Next track">
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

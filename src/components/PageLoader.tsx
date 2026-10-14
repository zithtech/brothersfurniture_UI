import { useEffect, useRef, useState } from 'react'
import loadingVideo from '../assets/loading1.mp4'

interface PageLoaderProps {
  onFinish?: () => void
}

export default function PageLoader({ onFinish }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const completedRef = useRef(false)

  const handleComplete = () => {
    if (completedRef.current) return
    completedRef.current = true
    setProgress(100)
    setIsExiting(true)
    setTimeout(() => {
      setIsMounted(false)
      onFinish?.()
    }, 600)
  }

  useEffect(() => {
    // Lock scroll while loader is visible
    document.body.style.overflow = 'hidden'

    const TOTAL_DURATION_MS = 3500
    const startTime = performance.now()
    let rafId: number

    const step = (now: number) => {
      const elapsed = now - startTime
      const pct = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100)
      setProgress(pct)

      if (elapsed < TOTAL_DURATION_MS) {
        rafId = requestAnimationFrame(step)
      } else {
        handleComplete()
      }
    }

    rafId = requestAnimationFrame(step)

    // Adjust video playback speed to finish in exactly 3.5s
    const video = videoRef.current
    if (video) {
      const tunePlayback = () => {
        if (video.duration && video.duration > 0) {
          video.playbackRate = video.duration / 3.5
        }
      }

      if (video.readyState >= 1) {
        tunePlayback()
      } else {
        video.addEventListener('loadedmetadata', tunePlayback, { once: true })
      }

      video.play().catch(() => {
        // Fallback if autoplay is blocked
      })
    }

    return () => {
      document.body.style.overflow = ''
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div
      aria-label="Loading Brothers Furniture"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#f4f5f7] px-6 py-8 sm:py-10 transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Center: Video on Light Gray Background */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="relative overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src={loadingVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="max-h-[300px] sm:max-h-[360px] md:max-h-[390px] w-auto aspect-[9/16] object-contain mix-blend-multiply select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom Bar: Progress & Status */}
      <div className="w-full max-w-xs flex flex-col items-center text-center gap-3">
        {/* Sleek Minimal Progress Line */}
        <div className="w-48 sm:w-56 h-[2px] bg-stone-300/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-48 sm:w-56 text-[10.5px] font-medium text-stone-500 font-mono tracking-wider">
          <span className="uppercase text-[9.5px] tracking-[0.18em] text-stone-400 font-sans">
            Crafting Workspaces
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}

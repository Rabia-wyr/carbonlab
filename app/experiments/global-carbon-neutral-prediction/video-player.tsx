"use client"

import { useState } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  title?: string
  description?: string
}

export default function VideoPlayer({ title = "碳中和预测实验介绍", description = "了解实验内容和操作流程" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const totalTime = 180 // 3分钟示例视频

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      // 模拟播放进度
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / totalTime) * 100

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-green-800 rounded-lg overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 bg-black/20">
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="mb-4">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-6">{description}</p>
            
            {/* 播放控制 */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
                <span className="ml-2">
                  {isPlaying ? "暂停" : "播放"}
                </span>
              </Button>
              
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="h-4 w-4" />
                <span>{formatTime(currentTime)} / {formatTime(totalTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 进度条 */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      {/* 视频内容模拟 */}
      <div className="absolute top-4 left-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
        实验介绍视频
      </div>
      
      {/* 章节标记 */}
      <div className="absolute top-4 right-4 text-white text-xs">
        <div className="bg-black/50 px-2 py-1 rounded mb-1">1. 实验背景</div>
        <div className="bg-black/50 px-2 py-1 rounded mb-1">2. 实验目标</div>
        <div className="bg-black/50 px-2 py-1 rounded">3. 操作流程</div>
      </div>
    </div>
  )
} 
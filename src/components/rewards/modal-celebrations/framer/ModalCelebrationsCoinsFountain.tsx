import { motion } from 'motion/react'
import React, { useEffect, useMemo } from 'react'

export interface CoinFountainProps {
  /** X coordinate of the fountain origin */
  originX: number
  /** Y coordinate of the fountain origin */
  originY: number
  /** Number of coins to spawn */
  coinCount?: number
  /** Duration of the animation in seconds */
  duration?: number
  /** Callback when animation completes */
  onComplete?: () => void
}

interface CoinParticle {
  id: number
  angle: number
  velocity: number
  size: number
  rotation: number
  delay: number
}

export const ModalCelebrationsCoinsFountain: React.FC<CoinFountainProps> = ({
  originX,
  originY,
  coinCount = 20,
  duration = 2,
  onComplete,
}) => {
  console.log('[CoinFountain] Component mounted with origin:', { originX, originY })

  // Generate coin particles with randomized properties
  const coins = useMemo<CoinParticle[]>(() => {
    console.log('[CoinFountain] Generating', coinCount, 'coins')
    return Array.from({ length: coinCount }, (_, i) => ({
      id: i,
      // Spread coins in a wider upward arc (angles between 45 and 135 degrees)
      angle: 45 + Math.random() * 90,
      // Much higher velocity for bigger fountain
      velocity: 300 + Math.random() * 250,
      // Much larger coin sizes (50-120px instead of 30-50px)
      size: 50 + Math.random() * 70,
      // Random rotation for variety
      rotation: Math.random() * 360,
      // Stagger the start times slightly
      delay: Math.random() * 0.15,
    }))
  }, [coinCount])

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [duration, onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    >
      {coins.map((coin) => {
        // Convert angle to radians (fountain upward arc)
        const angleRad = (coin.angle * Math.PI) / 180

        // Calculate velocity components
        const vx = Math.cos(angleRad) * coin.velocity
        const vy = Math.sin(angleRad) * coin.velocity // Positive = upward

        // Animation keyframes for parabolic arc (up then down) - bigger fountain
        const midX = originX + vx * 0.7  // Wider spread
        const midY = originY - vy * 1.2  // Much higher peak (negative = upward)

        console.log('[CoinFountain] Coin', coin.id, 'trajectory:', { midX, midY, angle: coin.angle })

        return (
          <motion.div
            key={coin.id}
            initial={{
              left: originX - coin.size / 2,
              top: originY - coin.size / 2,
              rotate: coin.rotation,
              opacity: 0,
              scale: 0.3,
            }}
            animate={{
              left: [
                originX - coin.size / 2,          // Start at origin
                midX - coin.size / 2,              // Arc to peak
                originX - coin.size / 2,          // Fall back to origin
              ],
              top: [
                originY - coin.size / 2,          // Start at origin
                midY - coin.size / 2,              // Arc to peak
                originY - coin.size / 2,          // Fall back to origin
              ],
              rotate: coin.rotation + 720,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0.3, 1, 1, 0.8, 0.5],
            }}
            transition={{
              duration: duration,
              delay: coin.delay,
              ease: "easeInOut",
              times: [0, 0.5, 1], // Keyframe timing for left/top
            }}
            style={{
              position: 'absolute',
              width: coin.size,
              height: coin.size,
              pointerEvents: 'none',
            }}
          >
            <img
              src="/assets/tristan.jpeg"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

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

// Animation easing curves from design spec
const EASINGS = {
  anticipationCompress: [0.6, 0.04, 0.98, 0.34] as const,
  burstLaunch: [0.34, 1.56, 0.64, 1] as const,
  apexSlow: [0.22, 1, 0.36, 1] as const,
  cascadeFall: [0.55, 0.085, 0.68, 0.53] as const,
  sparkleFlash: [0.68, -0.55, 0.265, 1.55] as const,
  glowPulse: [0.4, 0.0, 0.2, 1] as const,
}

const COLORS = {
  goldPrimary: '#FFD700',
  goldAccent: '#FFA500',
  yellowBright: '#FFEB3B',
  yellowPale: '#FFF9C4',
  whiteSparkle: '#FFFFFF',
}

// Physics constants
const GRAVITY = 980 // px/s²

interface CoinData {
  id: number
  angle: number // degrees
  velocity: number // px/s
  size: number // px
  rotationSpeed: number // deg/s
  delay: number // seconds
  apexX: number
  apexY: number
  apexTime: number // seconds
  landY: number
}

interface ParticleData {
  id: number
  color: string
  size: number
  offsetAngle: number // degrees from coin path
  offsetDistance: number // px
  coinId: number
  opacity: number
}

interface SparkleData {
  id: number
  x: number
  y: number
  size: number
  rotation: number
}

interface PreBurstParticleData {
  id: number
  angle: number
  distance: number
  size: number
}

// Helper component: Individual coin with squash/stretch
const CoinElement = ({ coin, originX, originY, duration }: {
  coin: CoinData
  originX: number
  originY: number
  duration: number
}) => {
  const { size, rotationSpeed, delay, apexX, apexY } = coin

  // FIREWORK FOUNTAIN: Launch from button, arc outward, fall back to button
  const buttonCenterX = originX - size / 2
  const buttonCenterY = originY - size / 2

  // Apex point (peak of the arc)
  const peakX = apexX - size / 2
  const peakY = apexY - size / 2

  return (
    <motion.div
      initial={{
        x: buttonCenterX,
        y: buttonCenterY,
        opacity: 0,
        scale: 0.3,
        rotate: 0,
      }}
      animate={{
        x: [buttonCenterX, peakX, buttonCenterX],
        y: [buttonCenterY, peakY, buttonCenterY],
        opacity: [0, 1, 1, 1, 0],
        scale: [0.3, 1.2, 1, 0.2],
        rotate: [0, rotationSpeed * 0.8, rotationSpeed * 1.6],
      }}
      transition={{
        duration: duration,
        delay: delay,
        times: [0, 0.35, 1],
        ease: 'easeInOut',
        opacity: {
          duration: duration,
          times: [0, 0.2, 0.7, 0.9, 1],
          ease: 'easeInOut',
        },
        scale: {
          duration: duration,
          times: [0, 0.35, 0.7, 1],
          ease: [0.34, 1.56, 0.64, 1],
        },
        rotate: {
          duration: duration,
          ease: 'linear',
        },
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        transform: 'translateZ(0)', // GPU acceleration
        willChange: 'transform, opacity',
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
}

// Helper component: Trailing particle
const ParticleElement = ({ particle, coin, originX, originY, duration }: {
  particle: ParticleData
  coin: CoinData
  originX: number
  originY: number
  duration: number
}) => {
  const { color, size, offsetAngle, offsetDistance, opacity } = particle
  const { delay, apexX, apexY } = coin

  // Particle follows curved path with offset
  const offsetRad = (offsetAngle * Math.PI) / 180
  const offsetX = Math.cos(offsetRad) * offsetDistance
  const offsetY = Math.sin(offsetRad) * offsetDistance

  const startX = originX + offsetX
  const startY = originY + offsetY
  const midX = apexX + offsetX * 1.5
  const midY = apexY + offsetY * 1.2

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        x: [startX, midX, startX + offsetX * 0.5],
        y: [startY, midY, originY + offsetY * 0.5],
        opacity: [0, opacity, opacity * 0.5, 0],
        scale: [0, 1, 0.3],
      }}
      transition={{
        duration: duration * 0.7,
        delay: delay + 0.05, // Trail behind coin
        times: [0, 0.3, 1],
        ease: EASINGS.apexSlow,
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    />
  )
}

// Helper component: Expanding burst ring at origin
const BurstRing = ({ originX, originY }: {
  originX: number
  originY: number
}) => {
  return (
    <motion.div
      initial={{
        x: originX - 30,
        y: originY - 30,
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: [0.5, 3],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 0.6,
        delay: 0.12,
        times: [0, 0.3, 1],
        ease: EASINGS.burstLaunch,
      }}
      style={{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${COLORS.goldPrimary}, ${COLORS.goldAccent})`,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        filter: 'blur(20px)',
      }}
    />
  )
}

// Helper component: Sparkle burst at apex
const SparkleElement = ({ sparkle }: {
  sparkle: SparkleData
}) => {
  const { x, y, size, rotation } = sparkle

  return (
    <motion.div
      initial={{
        x: x - size / 2,
        y: y - size / 2,
        scale: 0.5,
        opacity: 0,
        rotate: rotation,
      }}
      animate={{
        scale: [0.5, 1.5, 0],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 0.3,
        delay: 0.4, // Trigger at apex
        times: [0, 0.3, 1],
        ease: EASINGS.sparkleFlash,
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    >
      {/* Star shape using rotated squares */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: COLORS.whiteSparkle,
          transform: 'rotate(0deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: COLORS.whiteSparkle,
          transform: 'rotate(45deg)',
        }}
      />
    </motion.div>
  )
}

// Helper component: Ambient glow
const AmbientGlow = ({ originX, originY, duration }: {
  originX: number
  originY: number
  duration: number
}) => {
  return (
    <motion.div
      initial={{
        x: originX - 100,
        y: originY - 100,
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: [0.5, 1.2, 1, 1.1, 1, 1.05, 1],
        opacity: [0, 0.8, 0.4, 0.5, 0.4, 0.45, 0],
      }}
      transition={{
        duration: duration,
        times: [0, 0.05, 0.12, 0.5, 0.7, 0.85, 1],
        ease: EASINGS.glowPulse,
      }}
      style={{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${COLORS.goldPrimary}88, ${COLORS.yellowBright}66)`,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        filter: 'blur(40px)',
      }}
    />
  )
}

// Helper component: Pre-burst particle
const PreBurstParticle = ({ particle, originX, originY }: {
  particle: PreBurstParticleData
  originX: number
  originY: number
}) => {
  const { angle, distance, size } = particle
  const angleRad = (angle * Math.PI) / 180
  const targetX = originX + Math.cos(angleRad) * distance
  const targetY = originY + Math.sin(angleRad) * distance

  return (
    <motion.div
      initial={{
        x: originX,
        y: originY,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        x: [originX, targetX, targetX],
        y: [originY, targetY, targetY],
        scale: [0, 1, 0.5],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 0.12,
        times: [0, 0.5, 1],
        ease: EASINGS.anticipationCompress,
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: COLORS.goldPrimary,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
    />
  )
}

export const ModalCelebrationsCoinsFountain = ({
  originX,
  originY,
  coinCount = 35,
  duration = 2.8,
  onComplete,
}: CoinFountainProps) => {
  // Pre-calculate all coin trajectories
  const coins = useMemo<CoinData[]>(() => {
    return Array.from({ length: coinCount }, (_, i) => {
      const angle = 30 + Math.random() * 120 // 30-150 degrees
      const velocity = 600 + Math.random() * 500 // 600-1100 px/s (MUCH higher!)
      const size = 60 + Math.random() * 60 // 60-120px
      const rotationSpeed = 180 + Math.random() * 360 // 180-540 deg/s
      const delay = 0.12 + (i * 0.008) // Stagger by 8ms

      // Calculate apex point
      const angleRad = (angle * Math.PI) / 180
      const vx = Math.cos(angleRad) * velocity
      const vy = Math.sin(angleRad) * velocity
      const timeToApex = vy / GRAVITY
      const apexX = originX + vx * timeToApex
      const apexY = originY - (vy * timeToApex - 0.5 * GRAVITY * timeToApex * timeToApex)
      const apexTime = delay + timeToApex

      return {
        id: i,
        angle,
        velocity,
        size,
        rotationSpeed,
        delay,
        apexX,
        apexY,
        apexTime,
        landY: originY, // Not used anymore - firework returns to origin
      }
    })
  }, [coinCount, originX, originY])

  // Pre-calculate particles (3-4 per coin for total ~80-100 particles)
  const particles = useMemo<ParticleData[]>(() => {
    const particlesPerCoin = 3
    const particleColors = [
      COLORS.goldPrimary,
      COLORS.goldAccent,
      COLORS.yellowBright,
      COLORS.yellowPale,
    ]

    return coins.flatMap((coin) =>
      Array.from({ length: particlesPerCoin }, (_, i) => ({
        id: coin.id * particlesPerCoin + i,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 4 + Math.random() * 8, // 4-12px
        offsetAngle: coin.angle + (Math.random() - 0.5) * 30, // +/- 15 degrees
        offsetDistance: 10 + Math.random() * 20, // 10-30px
        coinId: coin.id,
        opacity: 0.4 + Math.random() * 0.4, // 0.4-0.8
      }))
    )
  }, [coins])

  // Pre-calculate sparkles at apex points (sample 20 coins)
  const sparkles = useMemo<SparkleData[]>(() => {
    const sparkleCount = 20
    const sampledCoins = coins
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, sparkleCount)

    return sampledCoins.map((coin, i) => ({
      id: i,
      x: coin.apexX + (Math.random() - 0.5) * 40,
      y: coin.apexY + (Math.random() - 0.5) * 40,
      size: 8,
      rotation: Math.random() * 360,
    }))
  }, [coins])

  // Pre-burst particles (8 small particles)
  const preBurstParticles = useMemo<PreBurstParticleData[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 8,
      distance: 30 + Math.random() * 20,
      size: 6,
    }))
  }, [])

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete()
      }, duration * 1000)
      return () => {
        clearTimeout(timer)
      }
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
      {/* Phase 1: Anticipation - Ambient Glow */}
      <AmbientGlow originX={originX} originY={originY} duration={duration} />

      {/* Phase 1: Anticipation - Pre-burst particles */}
      {preBurstParticles.map((particle) => (
        <PreBurstParticle
          key={`preburst-${String(particle.id)}`}
          particle={particle}
          originX={originX}
          originY={originY}
        />
      ))}

      {/* Phase 2: Burst - Origin Ring */}
      <BurstRing originX={originX} originY={originY} />

      {/* Phase 2-4: Coins */}
      {coins.map((coin) => (
        <CoinElement
          key={`coin-${String(coin.id)}`}
          coin={coin}
          originX={originX}
          originY={originY}
          duration={duration}
        />
      ))}

      {/* Phase 2-4: Particles */}
      {particles.map((particle) => {
        const coin = coins[particle.coinId]
        return (
          <ParticleElement
            key={`particle-${String(particle.id)}`}
            particle={particle}
            coin={coin}
            originX={originX}
            originY={originY}
            duration={duration}
          />
        )
      })}

      {/* Phase 3: Apex Sparkles */}
      {sparkles.map((sparkle) => (
        <SparkleElement key={`sparkle-${String(sparkle.id)}`} sparkle={sparkle} />
      ))}
    </div>
  )
}

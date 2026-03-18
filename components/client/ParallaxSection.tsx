import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Smooth spring config for buttery animations
const smoothSpring = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

const gentleSpring = {
  stiffness: 50,
  damping: 20,
  restDelta: 0.001,
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const rawY = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);
  const y = useSpring(rawY, smoothSpring);

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.5,
  overlay = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-30 * speed, 30 * speed]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  
  const y = useSpring(rawY, gentleSpring);
  const scale = useSpring(rawScale, gentleSpring);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale, willChange: "transform" }}
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-overlay pointer-events-none" />
      )}
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}

export function FloatingElement({ 
  children, 
  className = "", 
  delay = 0,
  amplitude = 8 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: [0.37, 0, 0.63, 1], // Custom smooth ease
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowOrbProps {
  className?: string;
  pulseSpeed?: number;
}

export function GlowOrb({ className = "", pulseSpeed = 8 }: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: pulseSpeed,
        repeat: Infinity,
        ease: [0.37, 0, 0.63, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    />
  );
}

// New: Smooth parallax hero component with spring physics
interface SmoothParallaxHeroProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export function SmoothParallaxHero({
  children,
  className = "",
  backgroundImage,
  overlayOpacity = 0.7,
}: SmoothParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  const y = useSpring(rawY, smoothSpring);
  const scale = useSpring(rawScale, smoothSpring);
  const opacity = useSpring(rawOpacity, smoothSpring);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          className="absolute inset-0"
          style={{ y, scale, willChange: "transform" }}
        >
          <Image
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>
      )}
      <motion.div style={{ opacity, willChange: "opacity" }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  );
}

// New: Magnetic hover effect component
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

// New: Reveal on scroll with spring physics
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 40 };
      case "down": return { opacity: 0, y: -40 };
      case "left": return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// New: Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

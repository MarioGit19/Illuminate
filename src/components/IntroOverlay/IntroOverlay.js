import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ReactComponent as Footstep } from "../IntroOverlay/footsteps-silhouette-variant-svgrepo-com (1).svg";
import "./IntroOverlay.css";

const IntroOverlay = ({ onComplete }) => {
  const [footstepTrail, setFootstepTrail] = useState([]);
  const [currentStep, setCurrentStep] = useState("left");
  const [footstepsPosition, setFootstepsPosition] = useState({
    x: window.innerWidth - 50,
    y: window.innerHeight - 50,
  });
  const animationRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Skip animation for mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsAnimationComplete(true);
      onComplete();
      return;
    }
  }, [isMobile, onComplete]);

  const calculateNextPosition = (targetX, targetY, progress) => {
    const stepSize = 60;
    const currentX = footstepsPosition.x;
    const currentY = footstepsPosition.y;

    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < stepSize) return { x: targetX, y: targetY };

    const ratio = stepSize / distance;
    const newX = currentX + dx * ratio;
    const newY = currentY + dy * ratio;

    // Apply the S-curve transformation
    const curveAmplitude = 50; // Adjust this value to change the curve's amplitude
    const curveFrequency = 0.1; // Adjust this value to change the curve's frequency

    // Calculate the perpendicular direction to the direct path
    const perpendicularX = -dy / distance;
    const perpendicularY = dx / distance;

    // Apply the curve offset in the perpendicular direction
    const curveOffset = curveAmplitude * Math.sin(curveFrequency * progress);
    const offsetX = curveOffset * perpendicularX;
    const offsetY = curveOffset * perpendicularY;

    return {
      x: newX + offsetX,
      y: newY + offsetY,
    };
  };

  useEffect(() => {
    if (isAnimationComplete || isMobile) return;

    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    let lastStepTime = 0;
    const stepInterval = 600;
    let progress = 0; // Initialize progress

    const animate = (timestamp) => {
      if (!lastStepTime) lastStepTime = timestamp;
      const elapsed = timestamp - lastStepTime;

      if (elapsed >= stepInterval) {
        progress += stepInterval; // Increment progress
        const newPosition = calculateNextPosition(targetX, targetY, progress);

        setFootstepTrail((trail) => [
          ...trail,
          {
            x: footstepsPosition.x,
            y: footstepsPosition.y,
            side: currentStep,
            id: Date.now(),
          },
        ]);

        setFootstepsPosition(newPosition);
        setCurrentStep((prev) => (prev === "left" ? "right" : "left"));
        lastStepTime = timestamp;

        const distance = Math.sqrt(
          Math.pow(targetX - newPosition.x, 2) +
            Math.pow(targetY - newPosition.y, 2)
        );

        if (distance < 50) {
          setIsAnimationComplete(true);
          cancelAnimationFrame(animationRef.current);
          onComplete();
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    footstepsPosition,
    currentStep,
    isAnimationComplete,
    calculateNextPosition,
    onComplete,
    isMobile,
  ]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className={`intro-overlay ${isAnimationComplete ? "fade-out" : ""}`}>
      <div
        className="cursor-light"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      {footstepTrail.map((step) => (
        <Footstep
          key={step.id}
          className={`footstep-trail ${step.side} ${
            isAnimationComplete ? "completed" : ""
          }`}
          style={{
            left: step.x,
            top: step.y,
          }}
        />
      ))}
      <motion.div
        className="pulsating-light"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.2, 1, 1.4, 1.2, 1.6, 1.4, 1.8, 1.6, 2],
          opacity: [0.5, 0.55, 0.5, 0.6, 0.55, 0.65, 0.6, 0.7, 0.65, 0.8],
          boxShadow: [
            "0 0 300px 150px rgba(255, 255, 255, 0.5)",
            "0 0 320px 160px rgba(255, 255, 255, 0.55)",
            "0 0 300px 150px rgba(255, 255, 255, 0.5)",
            "0 0 340px 170px rgba(255, 255, 255, 0.6)",
            "0 0 320px 160px rgba(255, 255, 255, 0.55)",
            "0 0 360px 180px rgba(255, 255, 255, 0.65)",
            "0 0 340px 170px rgba(255, 255, 255, 0.6)",
            "0 0 380px 190px rgba(255, 255, 255, 0.7)",
            "0 0 360px 180px rgba(255, 255, 255, 0.65)",
            "0 0 500px 250px rgba(255, 255, 255, 0.9)",
          ],
        }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        onAnimationComplete={() => setIsAnimationComplete(true)}
      />
    </div>
  );
};

export default IntroOverlay;

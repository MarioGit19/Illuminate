import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as Footstep } from "../IntroOverlay/footsteps-silhouette-variant-svgrepo-com (1).svg";
import { ReactComponent as SwitchOff } from "./switch-on-svgrepo-com.svg";
import { ReactComponent as SwitchOn } from "./switch-turned-on.svg";
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
  const [isToggled, setIsToggled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    if (isAnimationComplete) return;

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
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [footstepsPosition, currentStep, isAnimationComplete]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleToggleClick = () => {
    setIsToggled(true);
    setTimeout(() => {
      setTimeout(() => {
        onComplete();
      }, 1000); // Additional 1s delay after the switch animation
    }, 1000); // Wait for text animation before starting the additional delay
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className={`intro-overlay ${isToggled ? "fade-out" : ""}`}>
      {!isMobile && (
        <div
          className="cursor-light"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}
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
      <div
        className={`light-switch-container ${isToggled ? "toggled" : ""}`}
        onClick={handleToggleClick}
      >
        <div className="switch-content">
          {isToggled ? (
            <SwitchOn className="switch-image" />
          ) : (
            <SwitchOff className="switch-image" />
          )}
          <span className="switch-text off">OFF</span>
          <span className="switch-text on">ON</span>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;

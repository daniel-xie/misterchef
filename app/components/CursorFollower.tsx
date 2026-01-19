"use client";

import { useRef, useState, useEffect, CSSProperties } from "react";

export const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX: number = 0;
    let mouseY: number = 0;
    let cursorX: number = 0;
    let cursorY: number = 0;
    const speed: number = 0.15;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = (): void => {
      const distX: number = mouseX - cursorX;
      const distY: number = mouseY - cursorY;

      cursorX += distX * speed;
      cursorY += distY * speed;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = (): void => setIsHovering(true);
    const handleMouseLeave = (): void => setIsHovering(false);

    const interactiveElements =
      document.querySelectorAll<HTMLElement>("a, button, .card");

    interactiveElements.forEach((el: HTMLElement) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el: HTMLElement) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div style={styles.cursorWrapper}>
      <div
        ref={cursorRef}
        style={{
          ...styles.cursor,
          ...(isHovering ? styles.cursorHover : {}),
        }}
      />
    </div>
  );
};

interface Styles {
  cursorWrapper: CSSProperties;
  cursor: CSSProperties;
  cursorHover: CSSProperties;
}

const styles: Styles = {
  cursorWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 9999,
  },
  cursor: {
    position: "absolute",
    width: "28px",
    height: "28px",
    backgroundColor: "#000",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
    willChange: "transform",
    zIndex: 9999,
  },
  cursorHover: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

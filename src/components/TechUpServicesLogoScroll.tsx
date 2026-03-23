"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ProductTextOverlays from "./ProductTextOverlays";

export default function TechUpServicesLogoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Utilizing all 81 extracted frames for maximum smoothness
  const frameCount = 81;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Using the ezgif sequence in public/images/hero-scroll/
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/images/hero-scroll/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          // Initial draw
          if (canvasRef.current) {
             const ctx = canvasRef.current.getContext("2d");
             if (ctx) drawImage(ctx, canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 0.9], [0, frameCount - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === frameCount && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const index = Math.max(0, Math.min(Math.round(latest), frameCount - 1));
      if (ctx && images[index]) {
        requestAnimationFrame(() => drawImage(ctx, canvasRef.current!, images[index]));
      }
    }
  });

  const drawImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let renderWidth, renderHeight, x, y;

    // "cover" fit logic
    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      x = 0;
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderHeight = canvas.height;
      renderWidth = canvas.height * imgRatio;
      x = (canvas.width - renderWidth) / 2;
      y = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // redraw current frame
        if (images.length > 0) {
           const ctx = canvasRef.current.getContext("2d");
           const currentFrame = Math.max(0, Math.min(Math.round(frameIndex.get()), frameCount - 1));
           if (ctx && images[currentFrame]) {
              drawImage(ctx, canvasRef.current, images[currentFrame]);
           }
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#000212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Underlay glow or background effects can go here */}
        
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
        
        <ProductTextOverlays scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

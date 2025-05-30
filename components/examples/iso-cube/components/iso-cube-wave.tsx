"use client";

import { useRef, useCallback, useLayoutEffect, memo } from "react";

type Props = {
  gridSize?: number;
  cubeSize?: number;
  speed?: number;
  ripple?: number;
  amplitude?: number;
  fillColor?: string;
  strokeColor?: string;
  shadowColor?: string;
};

export const IsoCubeWave: React.FC<Props> = memo(
  ({
    gridSize = 9,
    cubeSize = 14,
    speed = 2.2,
    ripple = 0.6,
    amplitude = 3.2,
    fillColor = "#ffffff",
    strokeColor = "#151515",
    shadowColor = "#e0e0e0",
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const resizeObserver = useRef<ResizeObserver | null>(null);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);
    const minH = cubeSize;
    const maxH = cubeSize * amplitude;

    const heightsRef = useRef<number[][]>(
      Array.from({ length: gridSize }, () => Array(gridSize).fill(minH)),
    );

    const drawListRef = useRef<
      {
        x: number;
        y: number;
        h: number;
        top: number;
        left: number;
        below: number;
        right: number;
      }[]
    >(
      Array.from({ length: gridSize * gridSize }, () => ({
        x: 0,
        y: 0,
        h: 0,
        top: Number.NEGATIVE_INFINITY,
        left: Number.NEGATIVE_INFINITY,
        below: Number.NEGATIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
      })),
    );

    const toIso = useCallback(
      (x: number, y: number, z: number): [number, number] => {
        return [(x - y) * cos30, (x + y) * sin30 - z];
      },
      [cos30, sin30],
    );

    const onResize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      const [cx, cy] = toIso(
        (gridSize / 2) * cubeSize,
        (gridSize / 2) * cubeSize,
        0,
      );
      ctx.translate(width / 2 - cx, height / 2 - cy);
      ctx.lineWidth = 1;
      ctx.strokeStyle = strokeColor;
    }, [cubeSize, gridSize, toIso, strokeColor]);

    const drawCube = useCallback(
      (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        h: number,
        neighbors: { top: number; left: number; below: number; right: number },
      ) => {
        const v = (ix: number, iy: number, iz: number) =>
          toIso(ix * cubeSize, iy * cubeSize, iz);

        // top face
        const [A, B, C, D] = [
          v(x, y, h),
          v(x + 1, y, h),
          v(x + 1, y + 1, h),
          v(x, y + 1, h),
        ];
        ctx.beginPath();
        ctx.moveTo(A[0], A[1]);
        for (const point of [B, C, D]) {
          ctx.lineTo(point[0], point[1]);
        }
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();

        // right face
        if (x === gridSize - 1 || neighbors.right < h) {
          const h1 = Math.max(neighbors.right, h - cubeSize);
          const [Bt, Ct, Cb, Bb] = [
            v(x + 1, y, h),
            v(x + 1, y + 1, h),
            v(x + 1, y + 1, h1),
            v(x + 1, y, h1),
          ];
          ctx.beginPath();
          ctx.moveTo(Bt[0], Bt[1]);
          for (const point of [Ct, Cb, Bb]) {
            ctx.lineTo(point[0], point[1]);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        // bottom face
        if (y === gridSize - 1 || neighbors.below < h) {
          const h1 = Math.max(neighbors.below, h - cubeSize);
          const [Dt, Ct2, Cb2, Db] = [
            v(x, y + 1, h),
            v(x + 1, y + 1, h),
            v(x + 1, y + 1, h1),
            v(x, y + 1, h1),
          ];
          ctx.beginPath();
          ctx.moveTo(Dt[0], Dt[1]);
          for (const point of [Ct2, Cb2, Db]) {
            ctx.lineTo(point[0], point[1]);
          }
          ctx.closePath();
          ctx.fillStyle = shadowColor;
          ctx.fill();
          ctx.stroke();
        }
      },
      [cubeSize, gridSize, toIso, fillColor, shadowColor],
    );

    const animate = useCallback(
      (ts: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!startTimeRef.current) startTimeRef.current = ts;
        const t = (ts - startTimeRef.current) / 1000;

        ctx.clearRect(
          -canvas.width,
          -canvas.height,
          canvas.width * 2,
          canvas.height * 2,
        );

        const H = heightsRef.current;
        for (let y = 0; y < gridSize; y++) {
          const dy = y - (gridSize - 1) / 2;
          for (let x = 0; x < gridSize; x++) {
            const dx = x - (gridSize - 1) / 2;
            const s = Math.sin(t * speed - Math.hypot(dx, dy) * ripple);
            H[y][x] = minH + (maxH - minH) * ((s + 1) * 0.5);
          }
        }

        const DL = drawListRef.current;
        let idx = 0;
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            const h = H[y][x];
            DL[idx++] = {
              x,
              y,
              h,
              top: y > 0 ? H[y - 1][x] : Number.NEGATIVE_INFINITY,
              left: x > 0 ? H[y][x - 1] : Number.NEGATIVE_INFINITY,
              below: y < gridSize - 1 ? H[y + 1][x] : Number.NEGATIVE_INFINITY,
              right: x < gridSize - 1 ? H[y][x + 1] : Number.NEGATIVE_INFINITY,
            };
          }
        }
        DL.sort((a, b) => a.x + a.y + a.h * 0.01 - (b.x + b.y + b.h * 0.01));

        for (const c of DL) {
          drawCube(ctx, c.x, c.y, c.h, {
            top: c.top,
            left: c.left,
            below: c.below,
            right: c.right,
          });
        }

        frameRef.current = window.requestAnimationFrame(animate);
      },
      [drawCube, gridSize, minH, maxH, ripple, speed],
    );

    useLayoutEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      resizeObserver.current = new ResizeObserver(onResize);
      resizeObserver.current.observe(parent);
      onResize();

      frameRef.current = window.requestAnimationFrame(animate);

      return () => {
        resizeObserver.current?.disconnect();
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
        }
      };
    }, [animate, onResize]);

    return (
      <div className="h-full aspect-square mx-auto overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    );
  },
);

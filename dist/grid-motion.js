'use strict';
// Ported from Perakende Dijital: anchored grid, single controller, no frame-driven DOM updates.
(() => {
  if (!window.ResizeObserver || !window.IntersectionObserver) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const surfaces = Array.from(document.querySelectorAll("[data-industrial-grid]")).flatMap(canvas => {
      const context = canvas.getContext("2d", { alpha: true });
      return context ? [{ canvas, context, width: 0, height: 0, visible: false, inverse: canvas.dataset.industrialGrid === "inverse" }] : [];
    });
    if (!surfaces.length) return;

    let frame = 0;
    let lastPaint = 0;
    let elapsed = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, strength: 0, active: false, initialized: false };

    function paint(time, dt) {
      const still = reduced.matches;
      if (!still) {
        // Spring: mass 1, stiffness 100, damping 10. No React renders per frame.
        pointer.vx += ((pointer.targetX - pointer.x) * 100 - pointer.vx * 10) * dt;
        pointer.vy += ((pointer.targetY - pointer.y) * 100 - pointer.vy * 10) * dt;
        pointer.x += pointer.vx * dt;
        pointer.y += pointer.vy * dt;
        pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * Math.min(1, dt * 8);
      }

      for (const surface of surfaces) {
        if (!surface.visible) continue;
        const { context: ctx, canvas, width, height, inverse } = surface;
        if (!width || !height) continue;
        const rect = canvas.getBoundingClientRect();
        const px = pointer.x - rect.left;
        const py = pointer.y - rect.top;
        const color = inverse ? "244,244,242" : "185,54,67";
        const cell = width < 768 ? 72 : 64;
        const phase = still ? 0 : time;
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 0.7;

        if (!still) {
          const gx = pointer.strength > 0.05 ? px : width * (0.5 + Math.sin(phase * 0.13) * 0.32);
          const gy = pointer.strength > 0.05 ? py : height * (0.5 + Math.cos(phase * 0.11) * 0.24);
          const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 190);
          glow.addColorStop(0, `rgba(${color},${0.018 + pointer.strength * 0.018})`);
          glow.addColorStop(1, `rgba(${color},0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, width, height);
        }

        const segment = (x1, y1, x2, y2) => {
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const dx = px - mx;
          const dy = py - my;
          const distance = Math.hypot(dx, dy);
          const influence = still ? 0 : Math.pow(Math.max(0, 1 - distance / 190), 2) * pointer.strength;
          const wave = still ? 0 : Math.sin(phase * 0.7 + mx * 0.008 + my * 0.006) * 1.8;
          // Control-point displacement <= 12px; the visible midpoint bends <= 6px.
          const pull = influence * 10;
          const bendX = (distance ? dx / distance * pull : 0) + (x1 === x2 ? wave : 0);
          const bendY = (distance ? dy / distance * pull : 0) + (y1 === y2 ? wave : 0);
          const alpha = (inverse ? 0.075 : 0.06) + influence * 0.11;
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(mx + bendX, my + bendY, x2, y2);
          ctx.stroke();
        };

        for (let y = 24; y < height + cell; y += cell) {
          for (let x = 24; x < width + cell; x += cell) {
            segment(x, y, x + cell, y);
            segment(x, y, x, y + cell);
          }
        }
        // Fixed registration marks echo solar engineering drawings.
        ctx.strokeStyle = `rgba(${color},${inverse ? 0.15 : 0.11})`;
        ctx.beginPath();
        for (let y = 24; y < height; y += cell * 3) {
          for (let x = 24; x < width; x += cell * 4) {
            ctx.moveTo(x - 3, y); ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3); ctx.lineTo(x, y + 3);
          }
        }
        ctx.stroke();
      }
    }

    function tick(now) {
      frame = 0;
      if (disposed || document.hidden || reduced.matches) return;
      const interval = finePointer.matches ? 1000 / 30 : 1000 / 24;
      if (!lastPaint || now - lastPaint >= interval) {
        const dt = lastPaint ? Math.min((now - lastPaint) / 1000, 0.05) : 1 / 30;
        elapsed += dt;
        paint(elapsed, dt);
        lastPaint = now;
      }
      frame = requestAnimationFrame(tick);
    }

    function synchronize() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastPaint = 0;
      surfaces.forEach(({ canvas }) => { canvas.dataset.motion = reduced.matches ? "reduced" : document.hidden ? "paused" : "ambient"; });
      if (reduced.matches) paint(0, 0);
      else if (!document.hidden) frame = requestAnimationFrame(tick);
    }

    function resize() {
      for (const surface of surfaces) {
        const rect = surface.canvas.getBoundingClientRect();
        surface.width = rect.width;
        surface.height = rect.height;
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        surface.canvas.width = Math.round(rect.width * dpr);
        surface.canvas.height = Math.round(rect.height * dpr);
        surface.context.setTransform(dpr, 0, 0, dpr, 0, 0);
        surface.canvas.dataset.ready = "true";
      }
      if (reduced.matches) paint(0, 0);
    }

    function move(event) {
      if (reduced.matches || !finePointer.matches || event.pointerType === "touch") return;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      if (!pointer.initialized) { pointer.x = event.clientX; pointer.y = event.clientY; pointer.initialized = true; }
      pointer.active = true;
      surfaces.forEach(({ canvas }) => { canvas.dataset.pointer = "magnetic"; });
    }
    function leave() {
      pointer.active = false;
      surfaces.forEach(({ canvas }) => { canvas.dataset.pointer = "idle"; });
    }
    function preference() { leave(); synchronize(); }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { const surface = surfaces.find(item => item.canvas === entry.target); if (surface) { surface.visible = entry.isIntersecting; if (reduced.matches && surface.visible) paint(0, 0); } });
    });
    surfaces.forEach(({ canvas }) => { resizeObserver.observe(canvas); visibilityObserver.observe(canvas); });
    resize();
    synchronize();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", synchronize);
    reduced.addEventListener("change", preference);
    finePointer.addEventListener("change", preference);
    function dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect(); visibilityObserver.disconnect();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', synchronize);
      reduced.removeEventListener('change', preference);
      finePointer.removeEventListener('change', preference);
    }
    window.addEventListener('pagehide', event => { if (event.persisted) { cancelAnimationFrame(frame); frame = 0; } else dispose(); });
    window.addEventListener('pageshow', event => { if (event.persisted) synchronize(); });
})();

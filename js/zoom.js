// Pinch-to-zoom and pan for the drawing area
(function () {
  let scale = 1;
  let panX = 0;
  let panY = 0;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;

  const area = document.getElementById('drawing-area');
  const transform = document.getElementById('drawing-transform');
  const zoomLevelEl = document.getElementById('zoom-level');

  function applyTransform() {
    transform.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    zoomLevelEl.textContent = Math.round(scale * 100) + '%';
  }

  function clampPan() {
    const rect = area.getBoundingClientRect();
    const contentW = rect.width * scale;
    const contentH = rect.height * scale;
    const maxPanX = Math.max(0, (contentW - rect.width) / 2);
    const maxPanY = Math.max(0, (contentH - rect.height) / 2);
    panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
    panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
  }

  // --- Pinch zoom + pan via touch ---
  let touches = {};
  let lastDist = 0;
  let lastCenter = null;
  let isPinching = false;
  let isPanning = false;
  let pinchStartScale = 1;
  let touchStartTime = 0;
  let touchMoved = false;

  area.addEventListener('touchstart', (e) => {
    for (const t of e.changedTouches) {
      touches[t.identifier] = { x: t.clientX, y: t.clientY };
    }
    const ids = Object.keys(touches);
    touchMoved = false;
    touchStartTime = Date.now();

    if (ids.length === 2) {
      e.preventDefault();
      isPinching = true;
      isPanning = false;
      const [a, b] = ids.map(id => touches[id]);
      lastDist = Math.hypot(a.x - b.x, a.y - b.y);
      lastCenter = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      pinchStartScale = scale;
    } else if (ids.length === 1 && scale > 1.01) {
      // Single finger pan only when zoomed in
      isPanning = true;
      isPinching = false;
    }
  }, { passive: false });

  area.addEventListener('touchmove', (e) => {
    for (const t of e.changedTouches) {
      if (touches[t.identifier]) {
        touches[t.identifier] = { x: t.clientX, y: t.clientY };
      }
    }
    const ids = Object.keys(touches);
    touchMoved = true;

    if (isPinching && ids.length === 2) {
      e.preventDefault();
      const [a, b] = ids.map(id => touches[id]);
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

      // Scale
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchStartScale * (dist / lastDist)));

      // Pan with center movement
      const dx = center.x - lastCenter.x;
      const dy = center.y - lastCenter.y;
      panX += dx;
      panY += dy;
      lastCenter = center;
      lastDist = dist;
      pinchStartScale = newScale;

      scale = newScale;
      clampPan();
      applyTransform();
    } else if (isPanning && ids.length === 1 && scale > 1.01) {
      e.preventDefault();
      const t = e.changedTouches[0];
      const prev = touches[t.identifier];
      if (prev) {
        const dx = t.clientX - prev.x;
        const dy = t.clientY - prev.y;
        // Only prevent default pan if moved enough
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          panX += dx;
          panY += dy;
          touches[t.identifier] = { x: t.clientX, y: t.clientY };
          clampPan();
          applyTransform();
        }
      }
    }
  }, { passive: false });

  area.addEventListener('touchend', (e) => {
    for (const t of e.changedTouches) {
      delete touches[t.identifier];
    }
    const ids = Object.keys(touches);
    if (ids.length < 2) {
      isPinching = false;
    }
    if (ids.length === 0) {
      isPanning = false;

      // If it was a quick tap without much movement, trigger a click for coloring
      if (!touchMoved || (Date.now() - touchStartTime < 200)) {
        // Let the native click event handle it
      }
    }
  });

  area.addEventListener('touchcancel', (e) => {
    for (const t of e.changedTouches) {
      delete touches[t.identifier];
    }
    isPinching = false;
    isPanning = false;
  });

  // --- Mouse wheel zoom ---
  area.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));

    // Zoom toward mouse position
    const rect = area.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    panX = mx - (mx - panX) * (newScale / scale);
    panY = my - (my - panY) * (newScale / scale);

    scale = newScale;
    clampPan();
    applyTransform();
  }, { passive: false });

  // --- Zoom buttons ---
  document.getElementById('btn-zoom-in').addEventListener('click', (e) => {
    e.stopPropagation();
    scale = Math.min(MAX_SCALE, scale * 1.3);
    clampPan();
    applyTransform();
  });

  document.getElementById('btn-zoom-out').addEventListener('click', (e) => {
    e.stopPropagation();
    scale = Math.max(MIN_SCALE, scale / 1.3);
    clampPan();
    applyTransform();
  });

  document.getElementById('btn-zoom-reset').addEventListener('click', (e) => {
    e.stopPropagation();
    scale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
  });

  // Expose reset for when switching templates
  window.resetZoom = function () {
    scale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
  };
})();

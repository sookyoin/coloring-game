let canvasUndoStack = [];
const MAX_UNDO = 20;
const MAX_SIZE = 1024;
const FILL_TOLERANCE = 32;

function drawImageToCanvas(img, canvas) {
  let w = img.width;
  let h = img.height;
  if (w > MAX_SIZE || h > MAX_SIZE) {
    const ratio = Math.min(MAX_SIZE / w, MAX_SIZE / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  canvasUndoStack = [];
}

function loadImageToCanvas(file, canvas) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        drawImageToCanvas(img, canvas);
        resolve();
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImageUrlToCanvas(url, canvas) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      drawImageToCanvas(img, canvas);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

function canvasFloodFill(canvas, clickX, clickY) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const pixels = new Uint32Array(imageData.data.buffer);

  const x = Math.round(clickX);
  const y = Math.round(clickY);
  if (x < 0 || x >= w || y < 0 || y >= h) return;

  const targetColor = pixels[y * w + x];
  const fillHex = getSelectedColor();
  const fillRGBA = hexToRGBA(fillHex);
  const fillColor = rgbaToUint32(fillRGBA);

  if (targetColor === fillColor) return;

  // Save undo state
  const undoData = ctx.getImageData(0, 0, w, h);
  canvasUndoStack.push(undoData);
  if (canvasUndoStack.length > MAX_UNDO) canvasUndoStack.shift();

  // Scanline flood fill
  const stack = [[x, y]];
  const visited = new Uint8Array(w * h);

  while (stack.length > 0) {
    const [sx, sy] = stack.pop();
    if (sy < 0 || sy >= h) continue;
    if (visited[sy * w + sx]) continue;
    if (!colorMatch(pixels[sy * w + sx], targetColor, FILL_TOLERANCE)) continue;

    // Scan left
    let lx = sx;
    while (lx > 0 && !visited[sy * w + (lx - 1)] && colorMatch(pixels[sy * w + (lx - 1)], targetColor, FILL_TOLERANCE)) {
      lx--;
    }

    // Scan right
    let rx = sx;
    while (rx < w - 1 && !visited[sy * w + (rx + 1)] && colorMatch(pixels[sy * w + (rx + 1)], targetColor, FILL_TOLERANCE)) {
      rx++;
    }

    // Fill the span
    for (let i = lx; i <= rx; i++) {
      pixels[sy * w + i] = fillColor;
      visited[sy * w + i] = 1;
    }

    // Push adjacent rows
    let prevAbove = false;
    let prevBelow = false;
    for (let i = lx; i <= rx; i++) {
      if (sy > 0) {
        const above = colorMatch(pixels[(sy - 1) * w + i], targetColor, FILL_TOLERANCE) && !visited[(sy - 1) * w + i];
        if (above && !prevAbove) stack.push([i, sy - 1]);
        prevAbove = above;
      }
      if (sy < h - 1) {
        const below = colorMatch(pixels[(sy + 1) * w + i], targetColor, FILL_TOLERANCE) && !visited[(sy + 1) * w + i];
        if (below && !prevBelow) stack.push([i, sy + 1]);
        prevBelow = below;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function canvasUndo(canvas) {
  if (canvasUndoStack.length === 0) return;
  const ctx = canvas.getContext('2d');
  const data = canvasUndoStack.pop();
  ctx.putImageData(data, 0, 0);
}

function canvasReset(canvas) {
  if (canvasUndoStack.length === 0) return;
  const ctx = canvas.getContext('2d');
  const data = canvasUndoStack[0];
  ctx.putImageData(data, 0, 0);
  canvasUndoStack = [];
}

function canvasExport(canvas) {
  const pngUrl = canvas.toDataURL('image/png');
  triggerDownload(pngUrl, '색칠놀이.png');
}

function getCanvasCoords(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (canvas.width / rect.width);
  const y = (event.clientY - rect.top) * (canvas.height / rect.height);
  return { x, y };
}

// --- Helpers ---

function hexToRGBA(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b, a: 255 };
}

function rgbaToUint32({ r, g, b, a }) {
  return (a << 24) | (b << 16) | (g << 8) | r;
}

function uint32ToRGBA(val) {
  return {
    r: val & 0xFF,
    g: (val >> 8) & 0xFF,
    b: (val >> 16) & 0xFF,
    a: (val >> 24) & 0xFF,
  };
}

function colorMatch(c1, c2, tolerance) {
  const a = uint32ToRGBA(c1);
  const b = uint32ToRGBA(c2);
  return (
    Math.abs(a.r - b.r) <= tolerance &&
    Math.abs(a.g - b.g) <= tolerance &&
    Math.abs(a.b - b.b) <= tolerance
  );
}

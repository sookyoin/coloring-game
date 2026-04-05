document.addEventListener('DOMContentLoaded', () => {
  const screens = {
    home: document.getElementById('screen-home'),
    picker: document.getElementById('screen-picker'),
    coloring: document.getElementById('screen-coloring'),
  };

  const svgContainer = document.getElementById('svg-container');
  const paintCanvas = document.getElementById('paint-canvas');
  const paletteContainer = document.getElementById('palette');
  const titleEl = document.getElementById('coloring-title');
  const fileInput = document.getElementById('file-input');
  const templateGrid = document.getElementById('template-grid');

  let currentMode = null; // 'svg' or 'canvas'

  // Initialize palette
  createPalette(paletteContainer);

  // Screen navigation
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
  }

  // Home screen buttons
  document.getElementById('btn-templates').addEventListener('click', () => {
    buildTemplatePicker();
    showScreen('picker');
  });

  document.getElementById('btn-photo').addEventListener('click', () => {
    fileInput.click();
  });

  // Back buttons
  document.getElementById('btn-back-picker').addEventListener('click', () => {
    showScreen('home');
  });

  document.getElementById('btn-back').addEventListener('click', () => {
    showScreen('picker');
    currentMode = null;
  });

  // Build template picker
  function buildTemplatePicker() {
    templateGrid.innerHTML = '';

    // SVG templates section
    const svgLabel = document.createElement('div');
    svgLabel.className = 'template-section-label';
    svgLabel.textContent = '기본 그림';
    templateGrid.appendChild(svgLabel);

    TEMPLATES.forEach(t => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML = `
        <div class="template-thumb">${t.svg}</div>
        <div class="template-name">${t.emoji} ${t.name}</div>
      `;
      card.addEventListener('click', () => {
        openSvgTemplate(t.id);
      });
      templateGrid.appendChild(card);
    });

    // Image templates section
    const imgLabel = document.createElement('div');
    imgLabel.className = 'template-section-label';
    imgLabel.textContent = '색칠 도안';
    templateGrid.appendChild(imgLabel);

    IMAGE_TEMPLATES.forEach(t => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML = `
        <div class="template-thumb"><img src="${t.src}" alt="${t.name}" loading="lazy"></div>
        <div class="template-name">${t.emoji} ${t.name}</div>
      `;
      card.addEventListener('click', () => {
        openImageTemplate(t);
      });
      templateGrid.appendChild(card);
    });
  }

  // Open SVG template
  function openSvgTemplate(templateId) {
    currentMode = 'svg';
    svgContainer.style.display = 'flex';
    paintCanvas.style.display = 'none';
    const name = loadTemplate(templateId, svgContainer);
    titleEl.textContent = name || '색칠놀이';
    showScreen('coloring');

  }

  // Open image template
  function openImageTemplate(template) {
    currentMode = 'canvas';
    svgContainer.style.display = 'none';
    paintCanvas.style.display = 'block';
    titleEl.textContent = template.name;
    showScreen('coloring');
    loadImageUrlToCanvas(template.src, paintCanvas);

  }

  // Photo import
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    currentMode = 'canvas';
    svgContainer.style.display = 'none';
    paintCanvas.style.display = 'block';
    titleEl.textContent = '내 그림';
    showScreen('coloring');
    await loadImageToCanvas(file, paintCanvas);
    fileInput.value = '';

  });

  // Canvas click/touch handler
  function handleCanvasFill(e) {
    if (currentMode !== 'canvas') return;
    let clientX, clientY;
    if (e.type === 'touchend') {
      // Use the last touch point from changedTouches
      if (e.changedTouches.length === 0) return;
      const touch = e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const rect = paintCanvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (paintCanvas.width / rect.width);
    const y = (clientY - rect.top) * (paintCanvas.height / rect.height);
    canvasFloodFill(paintCanvas, x, y);
  }

  paintCanvas.addEventListener('click', handleCanvasFill);
  paintCanvas.addEventListener('touchend', handleCanvasFill);

  // Toolbar buttons
  document.getElementById('btn-undo').addEventListener('click', () => {
    if (currentMode === 'svg') svgUndo();
    else if (currentMode === 'canvas') canvasUndo(paintCanvas);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (currentMode === 'svg') svgReset();
    else if (currentMode === 'canvas') canvasReset(paintCanvas);
  });

  document.getElementById('btn-save').addEventListener('click', () => {
    if (currentMode === 'svg') svgExport();
    else if (currentMode === 'canvas') canvasExport(paintCanvas);
  });
});

let undoStack = [];
let currentSvgEl = null;

function loadTemplate(templateId, container) {
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) return;

  container.innerHTML = template.svg;
  currentSvgEl = container.querySelector('svg');
  undoStack = [];

  const fillables = currentSvgEl.querySelectorAll('path, circle, rect, ellipse, polygon');
  fillables.forEach(el => {
    if (el.dataset.nofill) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const prevFill = el.getAttribute('fill') || '#ffffff';
      const newColor = getSelectedColor();
      if (prevFill === newColor) return;
      undoStack.push({ element: el, previousFill: prevFill });
      el.setAttribute('fill', newColor);
      el.classList.add('fill-pulse');
      setTimeout(() => el.classList.remove('fill-pulse'), 300);
    });
  });

  return template.name;
}

function svgUndo() {
  if (undoStack.length === 0) return;
  const action = undoStack.pop();
  action.element.setAttribute('fill', action.previousFill);
}

function svgReset() {
  if (!currentSvgEl) return;
  const fillables = currentSvgEl.querySelectorAll('path, circle, rect, ellipse, polygon');
  fillables.forEach(el => {
    if (el.dataset.nofill) return;
    el.setAttribute('fill', '#ffffff');
  });
  undoStack = [];
}

function svgExport() {
  if (!currentSvgEl) return;

  const svgClone = currentSvgEl.cloneNode(true);
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgClone);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 600);
    ctx.drawImage(img, 0, 0, 800, 600);
    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL('image/png');
    triggerDownload(pngUrl, '색칠놀이.png');
  };
  img.src = url;
}

function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const COLORS = [
  { name: '빨강', hex: '#FF3B30' },
  { name: '진빨강', hex: '#C0392B' },
  { name: '주황', hex: '#FF9500' },
  { name: '귤색', hex: '#E67E22' },
  { name: '노랑', hex: '#FFCC00' },
  { name: '레몬', hex: '#FFF176' },
  { name: '연두', hex: '#A8E06C' },
  { name: '초록', hex: '#34C759' },
  { name: '진초록', hex: '#2E7D32' },
  { name: '민트', hex: '#80CBC4' },
  { name: '하늘', hex: '#5AC8FA' },
  { name: '파랑', hex: '#007AFF' },
  { name: '남색', hex: '#1A237E' },
  { name: '보라', hex: '#AF52DE' },
  { name: '연보라', hex: '#CE93D8' },
  { name: '자주', hex: '#880E4F' },
  { name: '분홍', hex: '#FF2D55' },
  { name: '연분홍', hex: '#F8BBD0' },
  { name: '살구', hex: '#FFAB91' },
  { name: '피부색', hex: '#FFCCBC' },
  { name: '갈색', hex: '#A2845E' },
  { name: '진갈색', hex: '#5D4037' },
  { name: '베이지', hex: '#D7CCC8' },
  { name: '검정', hex: '#1C1C1E' },
  { name: '진회색', hex: '#616161' },
  { name: '회색', hex: '#8E8E93' },
  { name: '연회색', hex: '#BDBDBD' },
  { name: '흰색', hex: '#FFFFFF' },
];

let selectedColor = COLORS[0].hex;
let changeCallback = null;

function createPalette(containerEl) {
  containerEl.innerHTML = '';
  COLORS.forEach((color, i) => {
    const btn = document.createElement('button');
    btn.className = 'palette-swatch' + (i === 0 ? ' active' : '');
    btn.style.backgroundColor = color.hex;
    btn.setAttribute('aria-label', color.name);
    btn.title = color.name;
    if (color.hex === '#FFFFFF') {
      btn.classList.add('swatch-white');
    }
    btn.addEventListener('click', () => {
      containerEl.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      selectedColor = color.hex;
      if (changeCallback) changeCallback(selectedColor);
    });
    containerEl.appendChild(btn);
  });
}

function getSelectedColor() {
  return selectedColor;
}

function onColorChange(callback) {
  changeCallback = callback;
}

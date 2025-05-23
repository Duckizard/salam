// Prevent arrow keys from scrolling
document.addEventListener('keydown', (e) => {
  if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault();
  }
});

// Map WASD to arrow keys
export const getKeyDirection = (key: string): string => {
  const keyMap: { [key: string]: string } = {
    'w': 'ArrowUp',
    'W': 'ArrowUp',
    's': 'ArrowDown',
    'S': 'ArrowDown',
    'a': 'ArrowLeft',
    'A': 'ArrowLeft',
    'd': 'ArrowRight',
    'D': 'ArrowRight',
  };

  return keyMap[key] || key;
};
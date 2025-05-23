// Color presets for particles
export const colorPresets = [
  '#38bdf8', // primary-400 (light blue)
  '#2dd4bf', // secondary-400 (teal)
  '#fb923c', // accent-400 (orange)
  '#4ade80', // success-400 (green)
  '#f87171', // error-400 (red)
  '#a78bfa', // purple
  '#f472b6', // pink
  '#facc15', // yellow
  '#ffffff', // white
];

// Camera position presets
export const cameraPresets = {
  default: [0, 0, 10],
  top: [0, 10, 0],
  side: [10, 0, 0],
  angle: [7, 7, 7],
};

// Performance settings
export const performanceSettings = {
  low: {
    particleCount: 1000,
    particleSize: 0.2,
  },
  medium: {
    particleCount: 3000,
    particleSize: 0.1,
  },
  high: {
    particleCount: 8000,
    particleSize: 0.05,
  },
};
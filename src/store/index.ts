import { create } from 'zustand';

type AnimationMode = 'wave' | 'vortex' | 'explosion' | 'galaxy';

interface VisualizerState {
  particleCount: number;
  setParticleCount: (count: number) => void;
  
  particleSize: number;
  setParticleSize: (size: number) => void;
  
  particleSpeed: number;
  setParticleSpeed: (speed: number) => void;
  
  particleColor: string;
  setParticleColor: (color: string) => void;
  
  animationMode: AnimationMode;
  setAnimationMode: (mode: AnimationMode | string) => void;
  
  showControls: boolean;
  toggleControls: () => void;
  
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;
  
  isAnimating: boolean;
  toggleAnimation: () => void;
  
  resetVisualization: () => void;
}

export const useStore = create<VisualizerState>((set) => ({
  // Particle properties
  particleCount: 3000,
  setParticleCount: (count) => set({ particleCount: count }),
  
  particleSize: 0.1,
  setParticleSize: (size) => set({ particleSize: size }),
  
  particleSpeed: 1.0,
  setParticleSpeed: (speed) => set({ particleSpeed: speed }),
  
  particleColor: '#38bdf8', // primary-400
  setParticleColor: (color) => set({ particleColor: color }),
  
  // Animation
  animationMode: 'wave' as AnimationMode,
  setAnimationMode: (mode) => set({ 
    animationMode: mode as AnimationMode 
  }),
  
  // Animation control
  isAnimating: true,
  toggleAnimation: () => set((state) => ({ 
    isAnimating: !state.isAnimating 
  })),
  
  // UI state
  showControls: true,
  toggleControls: () => set((state) => ({ 
    showControls: !state.showControls 
  })),
  
  // Camera
  cameraPosition: [0, 0, 10] as [number, number, number],
  setCameraPosition: (position) => set({ 
    cameraPosition: position 
  }),
  
  // Background
  backgroundColor: '#000000',
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  
  // Mouse interaction
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),
  
  // Reset functionality
  resetVisualization: () => set({
    particleCount: 3000,
    particleSize: 0.1,
    particleSpeed: 1.0,
    particleColor: '#38bdf8',
    animationMode: 'wave',
    backgroundColor: '#000000',
    cameraPosition: [0, 0, 10],
    isAnimating: true
  }),
}));
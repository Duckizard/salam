import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ParticleSystem from './three/ParticleSystem';
import ControlPanel from './ui/ControlPanel';
import LoadingScreen from './ui/LoadingScreen';
import PerformanceMonitor from './ui/PerformanceMonitor';
import { useStore } from '../store';

const ParticleVisualizer: React.FC = () => {
  const { 
    showControls, 
    cameraPosition,
    backgroundColor 
  } = useStore();

  return (
    <div className="w-full h-full relative">
      <Canvas 
        shadows 
        gl={{ antialias: true, alpha: true }}
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera 
            makeDefault 
            position={cameraPosition} 
            fov={75}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <ParticleSystem />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {showControls && <ControlPanel />}
      <LoadingScreen />
      <PerformanceMonitor />
    </div>
  );
};

export default ParticleVisualizer;
import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Points, 
  PointMaterial 
} from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store';
import { 
  updateWavePattern, 
  updateVortexPattern,
  updateExplosionPattern,
  updateGalaxyPattern
} from './particlePatterns';

const ParticleSystem: React.FC = () => {
  const {
    particleCount,
    particleSize,
    particleSpeed,
    particleColor,
    animationMode,
    mousePosition,
    isAnimating
  } = useStore();
  
  const pointsRef = useRef<THREE.Points>(null);
  const positionRef = useRef<THREE.BufferAttribute>(null);
  const velocityRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const initialPositionsRef = useRef<Float32Array | null>(null);
  const time = useRef(0);
  
  // Generate initial random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocity = velocityRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Random position in sphere
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random velocity
      velocity[i3] = (Math.random() - 0.5) * 0.01;
      velocity[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    // Store initial positions for resets
    initialPositionsRef.current = positions.slice();
    
    return positions;
  }, [particleCount]);
  
  useEffect(() => {
    // Update positions buffer when particle count changes
    if (pointsRef.current && positionRef.current) {
      positionRef.current.needsUpdate = true;
    }
  }, [particleCount, pointsRef, positionRef]);
  
  useFrame((state, delta) => {
    if (!isAnimating) return;
    
    time.current += delta * particleSpeed;
    
    if (!pointsRef.current || !positionRef.current) return;
    
    const positions = positionRef.current.array as Float32Array;
    
    // Apply different patterns based on animation mode
    switch (animationMode) {
      case 'wave':
        updateWavePattern(positions, time.current, particleCount);
        break;
      case 'vortex':
        updateVortexPattern(positions, time.current, particleCount);
        break;
      case 'explosion':
        updateExplosionPattern(positions, time.current, particleCount, initialPositionsRef.current);
        break;
      case 'galaxy':
        updateGalaxyPattern(positions, time.current, particleCount);
        break;
      default:
        break;
    }
    
    // Mouse interaction - attract particles to mouse position
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const mouseVector = new THREE.Vector3(
        mousePosition.x * 10,
        mousePosition.y * 10,
        0
      );
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const particlePos = new THREE.Vector3(
          positions[i3],
          positions[i3 + 1],
          positions[i3 + 2]
        );
        
        const direction = mouseVector.clone().sub(particlePos);
        const distance = direction.length();
        
        if (distance < 2) {
          direction.normalize().multiplyScalar(0.03 / Math.max(0.1, distance));
          positions[i3] += direction.x;
          positions[i3 + 1] += direction.y;
          positions[i3 + 2] += direction.z;
        }
      }
    }
    
    positionRef.current.needsUpdate = true;
  });
  
  return (
    <Points ref={pointsRef} limit={10000}>
      <bufferAttribute 
        ref={positionRef}
        attach="geometry.attributes.position" 
        array={positions} 
        count={positions.length / 3} 
        itemSize={3}
      />
      <PointMaterial
        transparent
        vertexColors
        size={particleSize}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={particleColor}
      />
    </Points>
  );
};

export default ParticleSystem;
import * as THREE from 'three';

// Wave pattern
export const updateWavePattern = (
  positions: Float32Array,
  time: number,
  particleCount: number
) => {
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    
    // Create a wave effect
    positions[i3 + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 2;
  }
};

// Vortex pattern
export const updateVortexPattern = (
  positions: Float32Array,
  time: number,
  particleCount: number
) => {
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    // Get distance from center
    const distance = Math.sqrt(x * x + y * y + z * z);
    
    // Create a rotational field effect
    const factor = 0.1 + distance * 0.05;
    const angle = time * factor;
    
    const newX = x * Math.cos(angle) - y * Math.sin(angle);
    const newY = x * Math.sin(angle) + y * Math.cos(angle);
    
    positions[i3] = newX;
    positions[i3 + 1] = newY;
  }
};

// Explosion pattern
export const updateExplosionPattern = (
  positions: Float32Array,
  time: number,
  particleCount: number,
  initialPositions: Float32Array | null
) => {
  if (!initialPositions) return;
  
  const explosionFactor = Math.min(time * 0.2, 5);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Get initial direction
    const dirX = initialPositions[i3];
    const dirY = initialPositions[i3 + 1];
    const dirZ = initialPositions[i3 + 2];
    
    // Normalize direction
    const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    const normalizedX = dirX / length;
    const normalizedY = dirY / length;
    const normalizedZ = dirZ / length;
    
    // Move particles outward
    positions[i3] = normalizedX * explosionFactor;
    positions[i3 + 1] = normalizedY * explosionFactor;
    positions[i3 + 2] = normalizedZ * explosionFactor;
  }
};

// Galaxy spiral pattern
export const updateGalaxyPattern = (
  positions: Float32Array,
  time: number,
  particleCount: number
) => {
  const arms = 3;
  const armWidth = 0.5;
  const revolutions = 2;
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Normalized index (0 to 1)
    const t = i / particleCount;
    
    // Radius increases with index
    const radius = 0.1 + t * 5;
    
    // Angle increases with index, plus some revolutions
    const angle = t * Math.PI * 2 * revolutions + time * 0.1;
    
    // Add some random offset for arm width
    const armOffset = (Math.random() - 0.5) * armWidth;
    
    // Calculate arm position
    const armIndex = Math.floor(Math.random() * arms);
    const armAngle = (Math.PI * 2 * armIndex / arms) + angle;
    
    // Convert to Cartesian coordinates
    positions[i3] = Math.cos(armAngle) * radius + armOffset;
    positions[i3 + 1] = (Math.random() - 0.5) * 0.5; // Thickness of disk
    positions[i3 + 2] = Math.sin(armAngle) * radius + armOffset;
  }
};
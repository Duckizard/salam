import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../store';

export const useMousePosition = () => {
  const { setMousePosition } = useStore();
  const { camera, size } = useThree();

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates
      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [setMousePosition, camera, size]);
};

export default useMousePosition;
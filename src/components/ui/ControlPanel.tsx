import React, { useState } from 'react';
import { 
  Sliders, 
  Palette, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Settings
} from 'lucide-react';
import { useStore } from '../../store';
import { colorPresets } from '../../constants';

const ControlPanel: React.FC = () => {
  const {
    particleCount,
    setParticleCount,
    particleSize,
    setParticleSize,
    particleSpeed,
    setParticleSpeed,
    particleColor,
    setParticleColor,
    animationMode,
    setAnimationMode,
    resetVisualization,
    backgroundColor,
    setBackgroundColor
  } = useStore();

  const [expandedSection, setExpandedSection] = useState<string>('animation');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const Section: React.FC<{
    title: string;
    icon: React.ReactNode;
    id: string;
    children: React.ReactNode;
  }> = ({ title, icon, id, children }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className="mb-2 overflow-hidden rounded-lg border border-white/10">
        <button
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 text-left"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        
        <div 
          className={`px-4 py-3 bg-black/20 transition-all duration-300 ${
            isExpanded ? 'max-h-96' : 'max-h-0 py-0 overflow-hidden'
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute top-4 right-4 w-80 control-panel z-10">
      <div className="p-4">
        <Section
          title="Animation"
          icon={<Play size={18} />}
          id="animation"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Mode</label>
              <select
                value={animationMode}
                onChange={(e) => setAnimationMode(e.target.value)}
                className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-3 py-2"
              >
                <option value="wave">Wave</option>
                <option value="vortex">Vortex</option>
                <option value="explosion">Explosion</option>
                <option value="galaxy">Galaxy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Speed: {particleSpeed.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                className="slider"
              />
            </div>
            
            <button
              onClick={resetVisualization}
              className="btn btn-ghost flex items-center gap-2 mt-2 text-sm w-full justify-center"
            >
              <RotateCcw size={16} />
              Reset Animation
            </button>
          </div>
        </Section>
        
        <Section
          title="Particles"
          icon={<Sliders size={18} />}
          id="particles"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Count: {particleCount}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Size: {particleSize.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={particleSize}
                onChange={(e) => setParticleSize(parseFloat(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </Section>
        
        <Section
          title="Colors"
          icon={<Palette size={18} />}
          id="colors"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Particle Color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    className={`w-full aspect-square rounded-full border-2 ${
                      color === particleColor
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setParticleColor(color)}
                    aria-label={`Set color to ${color}`}
                  />
                ))}
                <div className="flex items-center">
                  <input
                    type="color"
                    value={particleColor}
                    onChange={(e) => setParticleColor(e.target.value)}
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                />
                <button
                  onClick={() => setBackgroundColor('#000000')}
                  className="btn btn-ghost text-sm"
                >
                  Reset to Black
                </button>
              </div>
            </div>
          </div>
        </Section>
        
        <Section
          title="Settings"
          icon={<Settings size={18} />}
          id="settings"
        >
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              Camera Controls:
            </p>
            <ul className="text-sm text-gray-300 space-y-1 ml-4 list-disc">
              <li>Rotate: Click and drag</li>
              <li>Zoom: Scroll wheel</li>
              <li>Pan: Right-click and drag</li>
            </ul>
            <p className="text-sm text-gray-400 mt-2">
              Performance may vary based on your hardware. If you experience lag,
              try reducing the particle count.
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ControlPanel;
import React, { useState, useEffect } from 'react';

interface ThemeToggleSwitchProps {
  id?: string;
  className?: string;
  scale?: 'normal' | 'compact' | 'micro';
  onChange?: (isLight: boolean) => void;
}

export function ThemeToggleSwitch({
  id = 'theme-toggle-switch',
  className = '',
  scale = 'compact',
  onChange
}: ThemeToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    return localStorage.getItem('aqx_theme_mode') === 'light';
  });

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('aqx_theme_mode', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('aqx_theme_mode', 'dark');
    }
  }, [isChecked]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  const scaleClass = scale === 'micro'
    ? 'scale-50 origin-center -mx-6'
    : scale === 'compact'
    ? 'scale-75 origin-center -mx-3'
    : 'scale-100';

  return (
    <div className={`flex items-center gap-2 ${scaleClass} ${className}`}>
      <div className="toggle-switch">
        <label className="switch-label" htmlFor={id}>
          <input
            type="checkbox"
            className="checkbox"
            id={id}
            checked={isChecked}
            onChange={handleToggle}
          />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
}

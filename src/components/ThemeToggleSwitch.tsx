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
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('aqx_theme_mode') === 'light';
  });

  useEffect(() => {
    const applyTheme = (light: boolean) => {
      if (light) {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('aqx_theme_mode', 'light');
      } else {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('aqx_theme_mode', 'dark');
      }
    };

    applyTheme(isChecked);

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ isLight: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isLight === 'boolean') {
        setIsChecked(customEvent.detail.isLight);
      }
    };

    window.addEventListener('aqx-theme-change', handleSync);
    return () => window.removeEventListener('aqx-theme-change', handleSync);
  }, [isChecked]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('aqx_theme_mode', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('aqx_theme_mode', 'dark');
    }

    // Broadcast change to other switches in layout
    window.dispatchEvent(new CustomEvent('aqx-theme-change', { detail: { isLight: checked } }));

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
    <div 
      className={`flex items-center gap-2 ${scaleClass} ${className}`}
      title={isChecked ? "Switch to Dark Theme" : "Switch to Light Theme"}
    >
      <div className="toggle-switch">
        <label className="switch-label" htmlFor={id}>
          <input
            type="checkbox"
            className="checkbox"
            id={id}
            checked={isChecked}
            onChange={handleToggle}
            aria-label="Toggle Dark/Light Mode"
          />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
}


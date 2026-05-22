"use client";

import React from "react";

interface CalculatorSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  unit: string;
}

export default function CalculatorSlider({
  label,
  min,
  max,
  value,
  onChange,
  unit,
}: CalculatorSliderProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* Label and Current Value telemetry */}
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <span>{label}</span>
        <span className="font-mono text-zinc-950 dark:text-white flex items-baseline">
          <span className="text-sm font-black mr-0.5">{value}</span>
          <span className="text-[7.5px] font-bold text-zinc-400 dark:text-zinc-500">{unit}</span>
        </span>
      </div>

      {/* Styled custom range slider */}
      <div className="relative flex items-center w-full group">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-900 rounded-lg appearance-none cursor-pointer outline-none transition-all duration-300
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-red-600
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-red-500/20
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.4)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-115
            [&::-webkit-slider-thumb]:active:scale-95"
          style={{
            background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
              ((value - min) / (max - min)) * 100
            }%, ${document.documentElement.classList.contains("dark") ? "#18181b" : "#e4e4e7"} ${
              ((value - min) / (max - min)) * 100
            }%, ${document.documentElement.classList.contains("dark") ? "#18181b" : "#e4e4e7"} 100%)`,
          }}
        />
      </div>

      {/* Extreme limits helper labels */}
      <div className="flex justify-between text-[7px] font-extrabold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-0.5">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

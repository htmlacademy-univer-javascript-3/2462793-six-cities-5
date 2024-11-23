import './loading.css';
import React, {JSX} from 'react';

export function Loading() : JSX.Element {
  // Жестко заданные параметры
  const color : string = '#3069a6';
  const size: number = 80;
  const speedMultiplier : number = 1;

  const wrapperStyle : React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100vw',
    height: '100vh',
    animation: `react-spinners-rotate ${2 / speedMultiplier}s 0s infinite linear`,
  };

  const dotStyle = (i: number) : React.CSSProperties => ({
    position: 'relative',
    top: i % 2 ? '0' : 'auto',
    bottom: i % 2 ? 'auto' : '0',
    height: `${size / 2}px`,
    width: `${size / 2}px`,
    backgroundColor: color,
    borderRadius: '100%',
    animation: `react-spinners-bounce ${2 / speedMultiplier}s ${i === 2 ? '1s' : '0s'} infinite linear`,
  });

  return (
    <span style={wrapperStyle}>
      <span style={dotStyle(1)} />
      <span style={dotStyle(2)} />
    </span>
  );
}

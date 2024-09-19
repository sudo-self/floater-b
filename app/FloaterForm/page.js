"use client";

import FloaterForm from './FloaterForm';
import MatrixRain from './MatrixRain';
import './MatrixRain.css'; 

export default function FloaterFormPage() {
  return (
    <div className="matrix-rain-container">
      <FloaterForm />
      <MatrixRain />
    </div>
  );
}

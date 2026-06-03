'use client';

import { useEffect, useRef, useState } from 'react';

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let effect = null;

    const loadVanta = async () => {
      // vanta.topology is a p5.js effect, NOT three.js — it needs `p5`,
      // not `THREE`, or it throws "l is not a constructor" on init.
      const p5 = (await import('p5')).default;
      const VANTA = (await import('vanta/dist/vanta.topology.min')).default;

      effect = VANTA({
        el: vantaRef.current,
        p5, // pass the p5 constructor so Vanta can `new p5(...)` internally
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0xffffff,
        backgroundColor: 0x000000,
      });

      setVantaEffect(effect);
    };

    loadVanta();

    return () => {
      effect?.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
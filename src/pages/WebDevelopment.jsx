import React from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Divider from '@/Components/other/Divider';
import FractalOrbComponentSecond from '../Components/animatedblock/ProfileCard/WebHero';

gsap.registerPlugin(ScrollToPlugin);

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 dark:text-white overflow-x-hidden">
      <FractalOrbComponentSecond />
      <Divider/>
    </div>
  );
}
import ParallaxCardSlider from '../Components/animatedblock/ParallaxCardSlider.jsx';
import ThreeCubeAnimation from '../Components/animatedblock/ThreeCubeAnimation.jsx';
import FaceAnimation from '../Components/animatedblock/FaceAnimation.jsx';
import RollingText from '../Components/animatedtext/RollingText.jsx';
import ShaderCard from '../Components/animatedblock/ShaderCard.jsx';
import CelebrationCard from '../Components/components/CelebrationCard.jsx';
import TiltCard from '../Components/components/TiltCard.jsx';



import GlowingCard from '../Components/background/GlowingCard.jsx';
export default function Test() {
  return (
    <div>
      <ParallaxCardSlider />
           <RollingText/>

     <ShaderCard/>
     <ThreeCubeAnimation/>
     <FaceAnimation/>
      <CelebrationCard />
      <TiltCard />
     <GlowingCard/>
    </div>
  );
}
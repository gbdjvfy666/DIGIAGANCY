import ParallaxCardSlider from '../Components/animatedblock/ParallaxCardSlider.jsx';
import ThreeCubeAnimation from '../Components/animatedblock/ThreeCubeAnimation.jsx';
import FaceAnimation from '../Components/animatedblock/FaceAnimation.jsx';
import RollingText from '../Components/animatedtext/RollingText.jsx';
import ShaderCard from '../Components/animatedblock/ShaderCard.jsx';
import CelebrationCard from '../Components/components/CelebrationCard.jsx';
import TiltCard from '../Components/components/TiltCard.jsx';
import StaticColumn from '../Components/other/ColumnModel.jsx';


import GlowingCard from '../Components/background/GlowingCard.jsx';
export default function Test() {
    const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);

      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);
  return (
    <div>
      <ParallaxCardSlider />
           <RollingText/>
           
    <div style={{ width: '100%', height: '500px' }}>
      <StaticColumn />
    </div>
     <ShaderCard/>
     <ThreeCubeAnimation/>
     <FaceAnimation/>
      <CelebrationCard />
      <TiltCard />
     <GlowingCard/>
    </div>
  );
}
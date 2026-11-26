import { contarFramesHero } from "@/lib/frames";
import { HeroFrames } from "@/components/sections/HeroFrames";

export function Hero() {
  const totalFrames = contarFramesHero();
  return <HeroFrames totalFrames={totalFrames} />;
}

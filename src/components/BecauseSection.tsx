import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import BecauseCard from "./BecauseCard";
import BecauseImage from "./BecauseImage";

interface BecauseSectionProps {
  ID: number;
  TITLE: string;
  DESCRIPTION: string;
  IMAGE: string;
}

const BecauseSection: FunctionalComponent<{ data: BecauseSectionProps[] }> = ({
  data,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8">
        <div className="w-full space-y-4 bg-radial-[at_50%_50%] from-blue-400/10 via-transparent to-transparent">
          {data.map((benefit, index) => (
            <BecauseCard
              key={benefit.ID}
              title={benefit.TITLE}
              description={benefit.DESCRIPTION}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="w-full h-fit aspect-square mx-auto relative shadow-2xl rounded-lg overflow-hidden shadow-blue-300/40">
          {data.map((benefit, index) => (
            <BecauseImage
              key={benefit.ID}
              src={benefit.IMAGE}
              alt={benefit.TITLE}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefit-active::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 2px;
          background: linear-gradient(
            90deg,
            var(--color-blue-600),
            var(--color-blue-400)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderCompletion 15s linear;
        }

        @keyframes borderCompletion {
          0% {
            clip-path: inset(0 0 100% 0);
          }
          25% {
            clip-path: inset(0 0 75% 0);
          }
          50% {
            clip-path: inset(0 0 50% 0);
          }
          75% {
            clip-path: inset(0 0 25% 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </>
  );
};

export default BecauseSection;

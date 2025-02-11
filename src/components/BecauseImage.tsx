import type { FunctionalComponent } from "preact";

interface BenefitImageProps {
  src: string;
  alt: string;
  isActive: boolean;
}

const BenefitImage: FunctionalComponent<BenefitImageProps> = ({
  src,
  alt,
  isActive,
}) => {
  return (
    <div
      className={`
        absolute inset-0 transition-opacity duration-1000 ease-in-out
        
        ${isActive ? "opacity-100" : "opacity-0"}
      `}
    >
      <img
        src={src}
        alt={alt}
        width={400}
        height={400}
        loading="lazy"
        aria-placeholder={alt}
        className="object-cover size-full aspect-square"
      />
    </div>
  );
};

export default BenefitImage;

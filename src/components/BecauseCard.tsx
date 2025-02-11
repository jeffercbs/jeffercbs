import type { FunctionalComponent } from "preact";

interface BenefitCardProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const BenefitCard: FunctionalComponent<BenefitCardProps> = ({
  title,
  description,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`
        relative p-4 md:p-6 rounded-lg cursor-pointer
        transition-all duration-700 ease-in-out
        ${
          isActive
            ? "bg-zinc-800/50 benefit-active"
            : "bg-zinc-900/30 hover:bg-zinc-800/30"
        }
      `}
      onClick={onClick}
    >
      <h3 className="text-lg md:text-xl font-semibold mb-1">{title}</h3>
      <p
        className={`
        text-zinc-400 text-sm md:text-base
        transition-all duration-700 ease-in-out
        ${
          isActive
            ? "max-h-fit opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }
      `}
      >
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;

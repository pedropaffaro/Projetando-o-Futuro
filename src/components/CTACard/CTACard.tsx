import { Link } from "react-router-dom";

interface CTACardProps {
  icon: string;
  altText: string;
  description: string;
  textButton: string;
  to: string;
}

function CTACard({ icon, altText, description, textButton, to }: CTACardProps) {
  return (
    <div className="bg-white border-[3px] border-black p-8 md:p-10 flex flex-col items-start h-full hover:-translate-y-2 transition-transform duration-200">
      <div className="mb-8 h-20 w-auto">
        <img
          src={icon}
          alt={altText}
          className="h-full w-auto object-contain"
        />
      </div>

      <p className="text-black text-xl md:text-2xl leading-snug mb-12 flex-grow font-bold">
        {description}
      </p>

      <Link
        to={to}
        className="w-full text-center uppercase font-extrabold text-green-primary border-[3px] border-green-primary px-6 py-4 hover:bg-green-primary hover:text-white transition-colors text-lg tracking-wide"
      >
        {textButton}
      </Link>
    </div>
  );
}

export default CTACard;

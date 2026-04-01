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
    <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center h-full">
      <div className="mb-8 flex items-center justify-center h-20 w-full">
        <img
          src={icon}
          alt={altText}
          className="h-full w-auto object-contain"
        />
      </div>

      <p className="text-gray-700 text-lg leading-snug mb-10 flex-grow font-medium">
        {description}
      </p>

      <Link
        to={to}
        className="text-green-primary border-2 border-green-primary font-bold px-6 py-3 rounded-sm text-lg hover:text-white hover:bg-green-primary transition-colors"
      >
        {textButton}
      </Link>
    </div>
  );
}

export default CTACard;

import { FC } from "react";

interface ButtonProps {
   label: string;
   secondary?: boolean;
   fullWidth?: boolean;
   large?: boolean;
   onClick: () => void;
   disabled?: boolean;
   outline?: boolean;
}

const Button: FC<ButtonProps> = ({
   label,
   onClick,
   disabled,
   fullWidth,
   large,
   outline,
   secondary,
}) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`
    rounded-full font-semibold transition border-2 
    ${disabled ? "opacity-70 cursor-not-allowed" : "hover:opacity-80"} 
    ${fullWidth ? "w-full" : "w-fit"} 
    ${large ? "text-xl px-5 py-3" : "text-base px-4 py-2"} 
    ${
       outline
          ? "bg-transparent border-white text-white"
          : `${
               secondary
                  ? "bg-white text-black border-black"
                  : "bg-sky-500 text-white border-sky-500"
            }`
    }
  `}
      >
         {label}
      </button>
   );
};

export default Button;

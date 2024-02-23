import { FormEvent } from "react";

interface IButtonProps {
  onClick?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  txt: string;
  width?: 'w-full' | 'w-fit';
}

const Button = ({ className, txt,width = 'w-full', ...allNeededProps }: IButtonProps) => {
  return (
    <button
      className={`${className} text-white ${width} rounded-md hover:opacity-90`}
      {...allNeededProps}
    >
      {txt}
    </button>
  );
};

export default Button;

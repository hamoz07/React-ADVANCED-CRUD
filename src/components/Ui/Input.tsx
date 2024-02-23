import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IInputProps) => {
  return (
    <input
      {...rest}
     
     
    />
  );
};

export default Input;

import React from "react";
import './styles/button.scss';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Props> = ({ 
    children,
    type,
    disabled,
    className,
    onClick
  }) => { 
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
    {children}
    </button>
  );
}

export default Button;
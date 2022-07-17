import React from 'react';
import './styles/header.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<Props> = ({
  children,
  className
}) => {
  return (
    <div className="header">
      {children}
    </div>
  );
}

export default Header;
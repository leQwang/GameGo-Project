import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  className?: string;
  link: string;

}

const ButtonSearch: React.FC<Props> = ({ children, className = "", link }) => {
  return (
    <a href={link} target="_blank" className={`${className}`}>

      <span><button className="w-full h-full">{children}</button></span>

    </a>
  )
}

export default ButtonSearch;

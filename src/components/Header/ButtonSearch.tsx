import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  className?: string;
  link: string;

}

const ButtonSearch: React.FC<Props> = ({ children, className = "", link }) => {
  return (
    <a href={link} target="_blank" className={`${className}`}>

      <span><button className="h-full bg-orange rounded-r-xl w-14 md:w-20 px-2">{children}</button></span>

    </a>
  )
}

export default ButtonSearch;

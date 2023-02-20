import React from "react";

interface ButtonInterface {
  type: "black" | "white" | "outlined";
  text: string;
  size?: "normal" | "wide";
  onClick?: () => void;
}

const Button = ({ type, text, size, ...rest }: ButtonInterface) => {
  const renderButton = () => {
    if (type === "white") {
      return (
        <button
          {...rest}
          // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
          className={`text-color-black bg-color-white px-8 py-2 rounded-3xl font-bold hover:bg-color-blue hover:text-color-white duration-300 text-sm lg:text-base ${
            size === "wide" && "px-12"
          }`}
        >
          {text}
        </button>
      );
    }
    if (type === "outlined") {
      return (
        <button
          {...rest}
          // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
          className={`text-color-white border-2 border-color-white px-8 py-2 rounded-3xl font-bold hover:border-color-blue hover:text-color-blue duration-300 text-sm lg:text-base ${
            size === "wide" && "px-12"
          }`}
        >
          {text}
        </button>
      );
    }
    return (
      <button
        {...rest}
        // style={{ backgroundColor: type === "black" ? "#161616" : "" }}
        className={`text-color-white bg-color-black px-8 py-2 rounded-3xl font-bold hover:bg-color-blue hover:text-color-white duration-300 text-sm lg:text-base ${
          size === "wide" && "px-12"
        }`}
      >
        {text}
      </button>
    );
  };

  return renderButton();
};

export default Button;

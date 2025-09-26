import React from "react";
import style from "./campoInput.module.css"

interface CampoInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  type: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  readOnly?: boolean;
}

const CampoInput: React.FC<CampoInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  readOnly = false,
  ...rest //receber todos os parametros originais
}) => {
  return (
    <input className={style.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}     
      {...rest} //receber todos os parametros originais
    />
  );
};

export default CampoInput;

"use client";

import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({ name, placeholder, type, register, rules, error }: InputProps) => {
  return (
    <>
      <input
        className='w-full border-2 rounded-md h-11 px-2 bg-white'
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className='text-red-600 my-1'>{error}</p>}
    </>
  )
}

export default Input;
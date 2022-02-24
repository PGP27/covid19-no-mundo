import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const InputForm = ({ name, label, placeholder }: any) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1 ring-1 ring-slate-400 p-2 rounded-md shadow-md outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
};

export default InputForm;

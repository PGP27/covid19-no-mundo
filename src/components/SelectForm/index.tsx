import { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

const SelectForm = ({ name, label, options, ...rest }: any) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
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
  }, [fieldName, registerField, rest.isMulti]);
  
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}:</label>
      <select
        defaultValue={defaultValue}
        ref={selectRef}
        {...rest}
        className="mt-1 ring-1 ring-slate-400 p-2 rounded-md shadow-md outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option>Qualquer</option>
        {options.map((opt: any, index: number) => <option key={index}>{opt}</option>)}
      </select>
    </div>
  );
};

export default SelectForm;

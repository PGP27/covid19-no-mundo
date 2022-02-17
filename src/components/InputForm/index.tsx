import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const InputForm = ({ name, ...rest }: any) => {
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

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />
}

export default InputForm;

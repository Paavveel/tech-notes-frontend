import React, { useEffect, useState } from 'react';

export const usePersist = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [persist, setPersist] = useState<boolean>(() => {
    const value = localStorage.getItem('persist');
    return value ? JSON.parse(value) : false;
  });

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

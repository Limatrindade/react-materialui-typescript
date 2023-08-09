import { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';


export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndNew = useRef(false);
  const isSavingAndclose = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndclose.current = false;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndclose.current = false;
    isSavingAndNew.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndclose.current = true;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndclose.current;
  }, []);

  return { 
    formRef,
    
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,
    
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose
  };
};
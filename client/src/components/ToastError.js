import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner';

export const ToastError = ({titulo, descripcion}) => {

  useEffect(() => {
    toast.error(`${titulo}`, {
      description: `${descripcion !== undefined && descripcion !== false ? descripcion : " "}`,
    });

  }, []);

  return <Toaster 
    toastOptions={{ style: { color: 'black' }, className: 'toast_toastError', descriptionClassName: 'toast_toastError_description', iconClassName:'icon_toastSuccess' }}
    position='bottom-left' 
    theme='light'
    visibleToasts={1}
    duration={2000}
    closeButton
    richColors
    />;
}

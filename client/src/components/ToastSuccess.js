import React, { useEffect } from 'react'
import {Toaster, toast} from 'sonner'
import "../styles/toast.css"

export const ToastSuccess = ({titulo, descripcion}) => {

  useEffect(() => {
    toast.success(`${titulo}`, {
      description: `${descripcion !== undefined && descripcion !== false ? descripcion : " "}`,
    });
  }, []);

  return <Toaster 
    toastOptions={{ style: { color: 'black' }, className: 'toast_toastSuccess', descriptionClassName: 'toast_toastSuccess_description', iconClassName:'icon_toastSuccess' }}
    position='bottom-left' 
    theme='light'
    visibleToasts={1}
    duration={2000}
    closeButton
    richColors
    />;
}

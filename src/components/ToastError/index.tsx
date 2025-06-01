import { toast } from 'react-toastify';

interface ToastErrorProps {
    message: string;
}

const ToastError = ({ message }: ToastErrorProps) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    return null; // Este componente apenas dispara o toast, não precisa renderizar nada.
};

export default ToastError;

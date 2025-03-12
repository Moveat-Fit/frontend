import { toast } from 'react-toastify';

interface ToastErrorProps {
    message: string;
}

const ToastError = ({ message }: ToastErrorProps) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return null; // Este componente apenas dispara o toast, não precisa renderizar nada.
};

export default ToastError;

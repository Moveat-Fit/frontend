// components/ToastSuccess.tsx
import { toast } from 'react-toastify';

interface ToastSuccessProps {
    message: string;
}

const ToastSuccess = ({ message }: ToastSuccessProps) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });

    return null; // Este componente apenas dispara o toast, não precisa renderizar nada.
};

export default ToastSuccess;

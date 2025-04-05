import { toast } from 'react-toastify';

export const showToastSuccess = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });
};

export const showToastError = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });
};

export const showToastDefault = (message: string) => {
    toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "light",
    });
};

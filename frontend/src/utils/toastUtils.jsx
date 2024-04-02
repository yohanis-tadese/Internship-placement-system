// toastUtils.js
import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000, // Adjusted autoClose time to 3 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: "Bounce",
};

export const showToastSuccess = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  toast.success(message, mergedOptions);
};

export const showToastError = (message, options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };
  toast.error(message, mergedOptions);
};

export default { showToastSuccess, showToastError };

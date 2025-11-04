import { useToast } from 'vue-toastification';

const toast = useToast();

export const showToast = (
  message,
  type = 'success',
  position = 'bottom-right',
  timeout = 3000
) => {
  toast[type](message, {
    position,
    timeout,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

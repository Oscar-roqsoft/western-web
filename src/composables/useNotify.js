import { useNotification} from "naive-ui";

export const useNotify = () => {

// const loadingBar = useLoadingBar();
const notification = useNotification();
// const message = useMessage();



const success = (title, content) => {
  notification.success({
    title,
    content,
    duration: 3000
  });
};

const error = (title, content) => {
  notification.error({
    title,
    content,
    duration: 4000
  });
};

const info = (text) => {
//   message.info(text);
};

return {
 
  success,
  error,
  info
};

};
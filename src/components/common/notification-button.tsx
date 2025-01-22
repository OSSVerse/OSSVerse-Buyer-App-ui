import IconNotification from "../icons/icon-notification";
import { Button } from "../ui/button";

const NotificationButton = () => {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full relative bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      <IconNotification className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      <span className="absolute top-0 right-0 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center" />
    </Button>

  );
};

export default NotificationButton;

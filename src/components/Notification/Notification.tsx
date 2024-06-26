import { useDispatch } from 'react-redux';
import { markAsRead } from '../../store';
import { NotificationType } from '../../types';
// import { Link } from 'react-router-dom';
import styles from './Notification.module.scss';
import moment from 'moment';

interface NotificationProps {
  notification: NotificationType;
}

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(markAsRead(notification.id));
    console.log(notification.type);
    if (notification.type === 'request') {
      return '/request';
    } else if (notification.type === 'status-change') {
      return '/status-change';
    } else {
      return '/new-feature';
    }
  };

  return (
    <div
      className={`${styles.notification} ${
        notification.read ? styles.read : styles.unread
      }`}
      onClick={handleClick}
    >
      <div className={styles.imageWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>

      <div className={styles.messageWrapper}>
        <p>{notification.message}</p>
        <p className={styles.time}>{moment(notification.time).fromNow()}</p>
      </div>
    </div>
  );
};

export default Notification;

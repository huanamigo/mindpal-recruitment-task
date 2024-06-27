import { useDispatch } from 'react-redux';
import { markAsRead } from '../../store';
import { NotificationType } from '../../types';
import styles from './Notification.module.scss';
import moment from 'moment';
import NotificationIcon from '../NotificationIcon/NotificationIcon';
import { useNavigate } from 'react-router-dom';

interface NotificationProps {
  notification: NotificationType;
  onClose: () => void;
}

const Notification = ({ notification, onClose }: NotificationProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(markAsRead(notification.id));
    onClose();
    if (notification.type === 'request') {
      navigate('/request');
    } else if (notification.type === 'status-change') {
      navigate('/status-change');
    } else {
      navigate('/new-feature');
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
        <NotificationIcon type={notification.type} />
      </div>

      <div className={styles.messageWrapper}>
        <p>{notification.message}</p>
        <p className={styles.time}>{moment(notification.time).fromNow()}</p>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          dispatch(markAsRead(notification.id));
        }}
        className={!notification.read ? styles.readIndicator : styles.hidden}
      ></div>
    </div>
  );
};

export default Notification;

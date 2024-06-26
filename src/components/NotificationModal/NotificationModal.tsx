import styles from './NotificationModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { markAllAsRead } from '../../store';
import Notification from '../Notification/Notification';

interface NotificationsModalProps {
  onClose: () => void;
}

const NotificationsModal = ({ onClose }: NotificationsModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className={styles.modal}>
      <button onClick={onClose}>Close</button>
      <button onClick={handleMarkAllAsRead}>Mark all as read</button>
      <div>
        <h2>All Notifications</h2>
        <div>
          {notifications
            .slice(0)
            .reverse()
            .map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;

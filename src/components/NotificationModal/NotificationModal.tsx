import styles from './NotificationModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { markAllAsRead } from '../../store';
import Notification from '../Notification/Notification';
import { useState } from 'react';

interface NotificationsModalProps {
  onClose: () => void;
}

const NotificationsModal = ({ onClose }: NotificationsModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const [view, setView] = useState<'all' | 'unread'>('all');

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications =
    view === 'unread'
      ? notifications.filter((notification) => !notification.read)
      : notifications;

  return (
    <div className={styles.modal}>
      <div>
        <h2>
          Notifications
          <span>{unreadCount}</span>
        </h2>

        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.toggleButton} ${
              view === 'all' ? styles.active : styles.buttonDisabled
            }`}
            onClick={() => setView('all')}
            disabled={view === 'all'}
          >
            All Notifications
          </button>
          <button
            className={`${styles.toggleButton} ${
              view === 'unread' ? styles.active : styles.buttonDisabled
            }`}
            onClick={() => setView('unread')}
            disabled={view === 'unread'}
          >
            Unread Notifications
          </button>
          <button className={styles.allReadBtn} onClick={handleMarkAllAsRead}>
            ✓ Mark all as read
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
        </div>
        {filteredNotifications[0]?.id ? (
          <div className={styles.notificationWrapper}>
            {filteredNotifications
              .slice(0)
              .reverse()
              .map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  onClose={onClose}
                />
              ))}
          </div>
        ) : (
          <div className={styles.noNotification}>
            <p>There is nothing here 🥳</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;

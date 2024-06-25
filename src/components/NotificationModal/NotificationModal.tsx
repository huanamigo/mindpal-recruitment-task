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
    <div>
      <button onClick={onClose}>Close</button>
      <button onClick={handleMarkAllAsRead}>Mark all as read</button>
      <div>
        <h2>All Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsModal;

import { useDispatch } from 'react-redux';
import { markAsRead } from '../../store';
import { NotificationType } from '../../types';
import { Link } from 'react-router-dom';

interface NotificationProps {
  notification: NotificationType;
}

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(markAsRead(notification.id));
    // if (notification.type === 'request') {
    // } else if (notification.type === 'status_change') {
    // } else if (notification.type === 'new_feature') {
    // }
  };

  return (
    <div
      className={`notification ${notification.read ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <Link to={'/request'}>LINK</Link>
      <p>{notification.message}</p>
      {notification.read ? 'Read' : 'Unread'}
    </div>
  );
};

export default Notification;

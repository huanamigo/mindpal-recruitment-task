import { useDispatch } from 'react-redux';
import { addNotification } from './store';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import notificationsData from './notificationsData.json';
import { NotificationType } from './types';
import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const existingNotifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    ) as NotificationType[];

    if (existingNotifications.length === 0) {
      notificationsData.forEach((notification) => {
        const typedNotification: NotificationType = {
          ...notification,
          type: notification.type as
            | 'request'
            | 'status-change'
            | 'new-feature',
        };
        dispatch(addNotification(typedNotification));
      });
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Navbar />;
    </div>
  );
};

export default App;

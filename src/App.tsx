import { useDispatch } from 'react-redux';
import { addNotification } from './store';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import notificationsData from './notificationsData.json';
import { NotificationType } from './types';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const existingNotifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    ) as NotificationType[];

    notificationsData.forEach((notification) => {
      const typedNotification: NotificationType = {
        ...notification,
        type: notification.type as 'request' | 'status-change' | 'new-feature',
      };

      const notificationExists = existingNotifications.some(
        (existingNotification) =>
          existingNotification.id === typedNotification.id
      );

      if (!notificationExists) {
        dispatch(addNotification(typedNotification));
      }
    });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;

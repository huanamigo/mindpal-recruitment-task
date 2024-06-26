import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from './types';

interface NotificationsState {
  notifications: NotificationType[];
}

const LOCAL_STORAGE_KEY = 'notifications';

// local storage
const loadNotifications = (): NotificationType[] => {
  const notificationsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (notificationsJson) {
    return JSON.parse(notificationsJson) as NotificationType[];
  }
  return [];
};

const initialState: NotificationsState = {
  notifications: loadNotifications(),
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationType>) {
      const existingNotification = state.notifications.find(
        (notification) => notification.id === action.payload.id
      );
      if (!existingNotification) {
        state.notifications.push(action.payload);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.notifications)
        );
      }
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload
      );
      if (notification) {
        notification.read = true;
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.notifications)
        );
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(state.notifications)
      );
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

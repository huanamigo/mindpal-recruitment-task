import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from './types';

interface NotificationsState {
  notifications: NotificationType[];
}

const initialState: NotificationsState = {
  notifications: [],
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
      }
    },

    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },

    markAllAsRead(state) {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
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

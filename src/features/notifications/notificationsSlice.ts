import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../types';

export interface NotificationsState {
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
      state.notifications.push(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (notif) => notif.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead(state) {
      state.notifications.forEach((notif) => (notif.read = true));
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

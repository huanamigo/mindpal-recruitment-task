import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationProp {
  id: string;
  type: 'Request' | 'StatusChange' | 'NewFeature';
  message: string;
  read: boolean;
  link: string;
}

export interface NotificationsState {
  notifications: NotificationProp[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationProp>) {
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

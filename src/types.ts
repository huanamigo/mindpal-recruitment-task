export interface NotificationType {
  id: string;
  type: 'request' | 'status-change' | 'new-feature';
  message: string;
  read: boolean;
  time: string;
}

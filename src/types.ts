export interface NotificationType {
  id: string;
  type: 'request' | 'status_change' | 'new_feature';
  message: string;
  read: boolean;
}

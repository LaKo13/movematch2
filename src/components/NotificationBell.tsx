import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from './Button';

export function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(false);
  const { showNotification } = useNotifications();

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Button 
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setHasUnread(false)}
    >
      <Bell className="h-5 w-5" />
      {hasUnread && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-pulse">
          <span className="sr-only">New notifications</span>
        </span>
      )}
    </Button>
  );
}
import { api } from './api';

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      });

      // Send the subscription to the server
      const token = localStorage.getItem('movematch_token');
      if (token) {
        await api.notifications.subscribe(subscription, token);
      }
    }
  } catch (error) {
    console.error('Error setting up push notifications:', error);
  }
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}
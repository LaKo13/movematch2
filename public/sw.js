self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/truck.svg',
    badge: '/truck.svg',
    data: data.url,
    actions: data.actions,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action) {
    // Handle notification action clicks
    const actionUrl = event.notification.data + '?action=' + event.action;
    event.waitUntil(clients.openWindow(actionUrl));
  } else {
    // Handle notification clicks
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
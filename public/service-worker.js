// self.addEventListener('push', (event) => {
//     const data = event.data.json();
//     console.log('Notificación recibida:', data);

//     self.registration.showNotification(data.title, {
//         body: data.body,
//     });
// });


self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Notificación recibida:', data);

    // Mostrar la notificación con el payload recibido
    self.registration.showNotification(data.title, {
        body: data.body,
        data: { link: data.data?.link }, // Incluir el enlace en el campo "data"
    });
});

self.addEventListener('notificationclick', (event) => {
    

    const link = event.notification.data?.link; // Obtener el enlace desde "data"
    if (link) {
        event.waitUntil(clients.openWindow(link)); // Abrir el enlace en una nueva ventana/pestaña
    }
    event.notification.close(); // Cerrar la notificación
});


  

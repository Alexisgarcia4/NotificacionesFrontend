import React, { useState, useEffect  } from 'react';



const PushNotifications = () => {

    const [notificacionVisible, setNotificacionVisible] = useState(true);

    const [subscriptionStatus, setSubscriptionStatus] = useState(null);

    
    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    };

    const subscribeToPush = async () => {
        if (!('serviceWorker' in navigator)) {
            setSubscriptionStatus('Service Workers no son soportados en este navegador.');
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            setSubscriptionStatus('Permiso denegado para notificaciones.');
            return;
        }

        const registration = await navigator.serviceWorker.register('/service-worker.js').catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
            setSubscriptionStatus('Error al registrar el Service Worker.');
            return null;
        });
        
        if (!registration) {
            return; // Detiene el flujo si el registro falla
        };

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BLO9NvKIo92qxEjqpFNk9eD3K62_HLiZvskMMhmeZ2J2mtmpg-QKTD6kxoGOIOy_Q8g8v0rlEg6PMdobJ4xOl4E'),
        });


        // http://localhost:3000/subscribe  
        const response = await fetch('https://notificacionesbackend.onrender.com/api/subscriptions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                /*userId: '12345',*/
                subscription,
            }),
        }).catch((error) => {
            console.error('Error al enviar la suscripción al backend:', error);
            setSubscriptionStatus('Error al comunicarse con el servidor.');
            return null;
        });

        if (response.ok) {
            console.log('Suscripción exitosa.')
           setSubscriptionStatus('Suscripción exitosa.');

        setNotificacionVisible(false);

        } else {
            console.log('Error al suscribirse.')
            setSubscriptionStatus('Error al suscribirse.'); // Muestra el mensaje de error
        }


    };

    //http://localhost:3000/isRegistered 
    const checkRegistration = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                const response = await fetch('https://notificacionesbackend.onrender.com/api/subscriptions/isRegistered', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                });

                // Verifica si la respuesta es JSON
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();

                if (data.registered) {
                    setNotificacionVisible(false);
                }
            } else {
                console.error("La respuesta no es JSON:", await response.text());
                setSubscriptionStatus("La respuesta del servidor no es JSON.");
            }
                /*
                const data = await response.json();

                if (data.registered) {
                    setNotificacionVisible(false);
                }*/
            }
        } catch (error) {
            console.error('Error al verificar la suscripción:', error);
            
        } 
    };

    useEffect(() => {
        checkRegistration();
    }, []);

    const cancelarNotificacion=()=>setNotificacionVisible(false);



    return (

        <div>
        {notificacionVisible && (
            <div className="position-fixed top-5 start-50 translate-middle bg-white border border-dark rounded shadow p-4 z-3">
                <h3 className="text-center">Notificaciones Push</h3>
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button className="btn btn-primary" onClick={subscribeToPush}>
                        Habilitar Notificaciones
                    </button>
                    <button className="btn btn-primary" onClick={cancelarNotificacion}>
                        Cancelar
                    </button>
                </div>
                {subscriptionStatus && (
                    <div className="alert alert-info mt-3">{subscriptionStatus}</div>
                )}
            </div>
        )}
    </div>
        
    );
};

export default PushNotifications;

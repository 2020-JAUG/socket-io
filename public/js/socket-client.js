
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

/**
 * Los clientes estan escuchando los eventos on connect y on disconnect
 * Para saber cuando esta online o no un cliente
 */
socket.on('connect', () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    //console.log('Disconnected!');
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

/**
 * Aqui hacemos uso del evento ON (send-message) para escuchar el evento enviar mensaje (send-message) que creamos en el server dde socket
 * los nombres de los eventos tienen que ser los mismo en ambas partes, para poder realizar la conexión y que todos estemos escuchando el 
 * mismo evento.
 * 
 */
socket.on('send-message', (payload) => {
    console.log('client send message-> ', payload);
});


/**
 * Escuchando el evento on click para disparar y enviar los mensajes
 */
btnSend.addEventListener('click', () => {

    const message = txtMessage.value;
    const payload = {
        message,
        id: '1-abc-def',
        date: new Date().getTime()
    }

    /**
     * Cuando el cliente envia el message (payload), podemos enviar un tercer argumento que es un callback y por parámetros podemos
     * enviarle lo que sea.
     * Luego ese callback, el server tiene que ejecutarlo cuando todo termine, hay que poner al server a escuchar este message.
    */
    socket.emit('send-message', payload, (id) => {
        console.log('From server', id);
    });
});
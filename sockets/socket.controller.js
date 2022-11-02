const socketController = (socket) => {

    console.log('Client connect!', socket.id);

    socket.on('Client disconnect', () => { console.log('Client disconnect!', socket.id) });
    /**
     * Aqui escuchamos el evento cuando un cliente envia un mensaje y lo recibimos como payload. Podemos hacerlo async await para
     * grabar en nuestro modelo en la base de datos
     * Aqui estamos escychando a nuestro evento send-message y recibiendo por parametros:
     * El mensaje y el callback para devolver al cliente el ID que se genero al crear un message.
     */
    socket.on('send-message', (payload, callback) => {

        /** Capturamos el id que creo el mensaje al momento de crearlo en la database
         * Para luego ejecutar el callback y devolver el ID al cliente.
         * Con la constante hacemos el ejercicio que ya se grabo en la DB y nos devuelve un ID.
         * Para decirle al cliente que envio el mensaje sepa el id del mensaje enviado.
         */

        const msg_id = 123;

        // AQUI devuelvo el ID del message despues de crearlo en la base de datos. Podemos poner un try catch
        //callback({ msg_id, date: new Date() });
        callback(msg_id);

        /** Aqui enviamos un evento desde el server de socket y lo escuharan / recibiran, todos lo clientes que esten escuchando este evento.
         * El this.io es cuando el servidor de socket lo envia.
         * Desde aqui enviamos el PAYLOAD y los reciben los clientes en la funcion:
         * socket.on('send-message', (AQUI RECIBE EL PAYLOAD) => {do something})
         * con la propiedad broadcvast.emit le etamos incicando al sistema que envie un message a todos los 
         * clientes conectados a nuestro evento
        */

        socket.broadcast.emit('send-message', payload);
    });
}


module.exports = {
    socketController
}
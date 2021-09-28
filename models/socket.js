const Client = require('socket.io-client');
const config = require('../config.json');
const winston = require('winston');
const { getTimeStamp } = require('../lib/utils');
const { sendEmail } = require('../lib/emailNotification');
const { validate } = require('../lib/messageValidation');

class Socket {
/**
 * Represents a socket client.
 * @param   {Function} callback    callback after conneciton authenticated.
 * @returns {Object} - The socket client.
 * @constructor
 */
  constructor(callback) {
    this.authenticated = false;
    if(typeof this.client === 'undefined') {
      this.client = Client(config.server_url, {
        jsonp: false,
        transports: ["websocket"] }
      );
      winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: new connection created`);
      this.client.on('auth', (data) => this.authHandling(data, callback));
      this.authenticate();
    }

    this.client.on('ack', data => this.ackHandling(data));
    this.client.on('errors', data =>this.errorHandling(data));
    this.client.on('connect_error', (err) => this.connectionErrorHandling(err));
  }

/**
 * Authenticate current socket client's connection.
 */
  authenticate(){
    this.client.emit('auth', {
      client_id: config.client_id,
      client_secret: config.client_secret,
    })
  }

/**
 * Emit readings event with reading information.
 * @param   {Object} readings    readings information.
 */
  emitReadingMessage(readings){
    if (validate(readings, 'readings')){
      this.client.emit('readings', readings)
    }else{
      this.errorHandling('message is invalid')
    }
  }

/**
 * Emit monitors event for creating/updating a monitor.
 * @param   {Object} monitorInfo    monitors information.
 */
  emitMonitorMessage(monitorInfo){
    if (validate(monitorInfo, 'monitors')){
    this.client.emit('monitors', monitorInfo)
    }else{
      this.errorHandling('message is invalid')
    }
  }

/**
 * Disconnect current socket client.
 */
  disconnect(){
    this.client.disconnect();
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: disconnected`);
  }

/**
 * Handling the socket errors
 * @param   {String/Object} response    error message.
 */
  errorHandling(response){
    sendEmail(
      config.sendgrid.from_email,
      config.sendgrid.to_email,
      "Socket API error notification!",
      `This is an sample notification! Detail: ${JSON.stringify(response)}`
    );
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: errors: | ${JSON.stringify(response)}`);
  }

/**
 * Handling the ack event from Socket API server
 * @param   {String/Object} response    ack event message responsed from server.
 */
  ackHandling(response){
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: Acked message | ${JSON.stringify(response)}`);
  }

/**
 * Handling the connection error
 * @param   {String/Object} err    connection error message.
 */
  connectionErrorHandling(err){
    this.errorHandling(err);
    throw 'Socket connection damaged, please check';
  }

/**
 * Handling the connection error
 * @param   {String/Object} response  auth event message responsed from server.
 * @param   {Function} callback    callback after authenticated successfully.
 */
  authHandling(response, callback){
    if (response.code === '10200') {
      this.authenticated = true;
      winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: new connection authenticated`);
      if (callback && (typeof callback == "function")) {
        callback();
      }
    } else {
      this.errorHandling(response)
    }
  }
}
module.exports = Socket;

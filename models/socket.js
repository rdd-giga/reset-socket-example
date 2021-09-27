const Client = require('socket.io-client');
const config = require('../config.json');
const winston = require('winston');
const { getTimeStamp } = require('../lib/utils');
const { sendEmail } = require('../lib/emailNotification');

class Socket {
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

  authenticate(){
    this.client.emit('auth', {
      client_id: config.client_id,
      client_secret: config.client_secret,
    })
  }

  emitReadingMessage(readings){
    this.client.emit('readings', readings)
  }

  emitMonitorMessage(monitorInfo){
    this.client.emit('monitors', monitorInfo)
  }

  disconnect(){
    this.client.disconnect();
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: disconnected`);
  }

  errorHandling(response){
    sendEmail(
      config.sendgrid.from_email,
      config.sendgrid.to_email,
      "Socket API error notification!",
      `This is an sample notification! Detail: ${JSON.stringify(response)}`
    );
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: errors: | ${JSON.stringify(response)}`);
  }

  ackHandling(response){
    winston.info(`${getTimeStamp()} | Socket id:  ${this.client.id}: Acked message | ${JSON.stringify(response)}`);
  }

  connectionErrorHandling(err){
    this.errorHandling(err);
    throw 'Socket connection damaged, please check';
  }

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

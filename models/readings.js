const { getTimeStamp } = require('../lib/utils');
const config = require('../config.json');

class Readings {
/**
 * Represents a reading message.
 * @param   {String} connection_id    connection_id of the monitor
 * @returns {Object} - The reading message.
 * @constructor
 */
  constructor(connection_id) {
    this.message = {
    'message_id': `Readings__${config.client_id}__${connection_id}__${getTimeStamp()}`, //Unique message_id sample.
    'data':
      {
        'connection_id': connection_id,
        'readings': this.getReadings(connection_id),
      },
    };
  }

  /**
  * Function that get a reading information
  * Fake code here, Use your own code to get lastest reading data.
  * Maybe intervally read the data from redis(cache),
  * Maybe subscribe to a RabbitMQ
  * Maybe grab from database
  * @param    {String} connection_id    connection_id of the monitor
  * @return   {Object} - reading information message
  */
  getReadings(connection_id){
    return [
      {'connection_id':connection_id,
        'reading_time':'2017-03-15T15:30:00.000+08:00',
        'tvoc': 0,
        'pm2p5': 100.2,
        'co2': 800,
        'rh': 40
      },{
        'connection_id': connection_id,
        'reading_time':'2017-03-15T16:00:00.000+08:00',
        'tvoc': 0.8,
        'pm2p5': 100,
        'co2': 500,
        'temp': 15,
        'rh': null
      }
    ]
  }

}
module.exports = Readings;

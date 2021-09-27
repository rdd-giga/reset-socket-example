const { getTimeStamp } = require('../lib/utils');
const config = require('../config.json');

class Monitors {
  constructor(connection_id) {
    this.monitorCreatingMessage = {
      'message_id': `Monitors__${config.client_id}__${connection_id}__${getTimeStamp()}`, //Unique message_id sample.
      "message_type": "create",
      "data": this.getMonitorsInfo(connection_id)
    }

  }

  getMonitorsInfo(connection_id){
    return {
        "label": `testing_${connection_id}_for_${config.client_id}`,
        "connection_id": connection_id,
        "module": 'air',
        "meta": {
          "monitor_detail": {
            "monitor_brand": 'null',
            "monitor_sku":"ZonePlus",
            "monitor_serial_id":"00-04-a3-0b-00-04-3d-b0",
            "last_monitor_calibration_date":'2017-03-15T16:00:00.000+08:00',
          },
          "included_parameters": {
            'pm2p5':null,
            'tvoc':
              {
                "unit": "ppb",
              },
            'co2':
              {
                "unit": "ppm",
              },
            'temp':
              {
                "unit": "C",
              }
          }
        }
      }
  }

}
module.exports = Monitors;

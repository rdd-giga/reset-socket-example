const { getTimeStamp } = require('./lib/utils');
const Readings = require('./models/readings');
const Monitors = require('./models/monitors');
const Socket = require('./models/socket');

let socket = new Socket();

/*
  Below is a fake daily task
  Implement these code base on your data strategy, for example:
  1. Run the hourly task by setInterval, grab the monitor/reading info from db/cache
  2. Listen to a RabbitMQ, if there is new data, call the emit task
*/
setInterval(dailyTask, 24*36*1000);

function dailyTask(){
  // let monitors = grab_monitor_info_from_backend
  // Mock data here as:
  let monitorIds = [
    'connection_id_for_your_monitor_1',
    'connection_id_for_your_monitor_2',
    'connection_id_for_your_monitor_3',
  ]
  emitMonitorMessage(monitorIds)
  emitReadingMessage(monitorIds)
}


function emitMonitorMessage(monitorIds) {
  monitorIds.forEach((connection_id) => {
    let monitor = new Monitors(connection_id)
    console.log(monitor.monitorCreatingMessage)
    socket.emitMonitorMessage(monitor.monitorCreatingMessage)
  })
}


function emitReadingMessage(monitorIds) {
  monitorIds.forEach((connection_id) => {
    let reading = new Readings(connection_id)
    console.log(reading.message)
    socket.emitReadingMessage(reading.message)
  })
}


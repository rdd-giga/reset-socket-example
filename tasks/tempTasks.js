const { getTimeStamp } = require('../lib/utils');
const Readings = require('../models/readings');
const Monitors = require('../models/monitors');
const Socket = require('../models/socket');

let socket = new Socket(tempTask); //Run temporary task in callback.



/**
* The following code is a implementation for fake temporary task.
* Run these tasks for pushing data or
* creating/updating monitor for the one-off requirements.
* Once after editing this file and the functions,
* just run task by command: `npm run task`.
* After running these tasks, close it mannually.
* Implement these code base on your data strategy and requirements.
*/
function tempTask(){
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

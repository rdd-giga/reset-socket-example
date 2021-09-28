# reset-socket-example
Sample code for Data Providers connecting to RESET Socket API,  pushing monitor information and reading data.


# Usage

1. Create a Socket.io-client connected to [RESET Socket API](https://doc.reset.build/providers/v2).
2. Authenticated the socket connection
3. Daily/Houly Pushing data to RESET Socket API Server.
4. Run temporay task for pushing data/create monitor by once-off requirements.
5. Validate the message from client.
6. Handling server's response.
7. Integrate with email notification for error handling

#Setup

1. Download the code, and ``npm install``

2. Copy the config template``cp config.json.template config.json``, then edit the confg.json use your ow configruation.

3. Run the daily/hourly pushing serverice as a long-run connection: ``npm start``.(The code entrance is ./index.js, remember edit the information base on your requirements)

4. Run the temporay task for once-off requirments of pushing data: ``npm run task`(The code entrance is ./tasks/tempTasks.js, remember edit the information base on your requirements),remember to close the taks mannually.

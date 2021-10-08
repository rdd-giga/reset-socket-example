# reset-socket-example
Sample code for RESET Data Providers connecting via the RESET Socket API for pushing monitor information and readings data.

This sample is built on node.js.

# Usage
This repository includes examples on the following:

1. Create a socket.io client that connects to the RESET Cloud via the [RESET Socket API](https://doc.reset.build/providers/v2).
2. Authenticate the socket connection
3. Daily or Hourly data push to the RESET Cloud via the RESET Socket API Server.
4. Run manual tasks for re-pushing missing data or creating monitors.
5. Validate messages from client.
6. Handle servers responses.
7. Integrate with email notification for error handling.

# Setup
1. Download the code and run ``npm install``
2. Make a copy of the config.json template ``cp config.json.template config.json`` and edit the config.json using your own system's configuration.
3. Run the daily/hourly data pushing service as a long term connection: ``npm start``. The code can be found in ./index.js. Remember to edit the information based on your requirements.
4. Run manual tasks data pushes with temporary requirements: ``npm run task``. The code entrance is ./tasks/tempTasks.js. Remember to edit the information based on your requirements and remember to close the tasks manually.

If there are any questions or issues, please notify us by sending an email to info[at]reset.build. Thanks!

const rpc_client = require('../rpc_client.js');

async function sendMatchingRequest(req, res) {
    try {
      const { username, complexity, timeOfReq } = req.body;
      const response = await rpc_client.sendMatchingRequest(username, complexity, timeOfReq).catch(error => {
        console.log('Error occurred when sending match request ', error);
        return JSON.stringify({
          isMatchFound: false,
          username : '',
          roomId : -1,
          message: 'Server error occurred. Try again later!'
        });
      });

      return res.status(200).send(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while sending your match request' });
    }
  }

  module.exports = { sendMatchingRequest };
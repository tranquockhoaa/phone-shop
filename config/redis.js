const { createClient } = require('redis');

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  await client.connect();
  console.log('Redis Connected');
};

connectRedis();

console.log(client.isOpen);
module.exports = client;

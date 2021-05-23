import { app } from './app';
import { server_port } from './config.json';

const start = () => {
  const SERVER_PORT = process.env.SERVER_PORT || server_port;

  app.listen(SERVER_PORT, () =>
    console.log(`Backend listening on port ${SERVER_PORT}`)
  );
};

start();

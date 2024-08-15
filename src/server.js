/* eslint-disable semi */
/* eslint-disable no-console */

import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb';
import express from 'express';
import AsyncExitHook from 'async-exit-hook';
import { env } from './config/environment';
import { APIs_v1 } from './routes/v1';
const START_SERVER = () => {
  const app = express();

  // Enable req.body json data
  app.use(express.json());

  app.get('/', async (req, res) => {
    try {
      const db = GET_DB();

      const collections = await db.listCollections().toArray();
      console.log(collections);

      res.send('<h1>Hello World!</h1><hr>');
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  //Use APIs V1
  app.use('/v1', APIs_v1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hi ${env.AUTHOR}. Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  //Thực hiện các tác vụ cleanup trước khi dừng server
  AsyncExitHook(() => {
    console.log('4. Đang ngắt kết nối tới MongoDB Cloud Atlas...');
    CLOSE_DB().then(() => {
      console.log('5. Đã ngắt kết nối tới MongoDB Cloud Atlas');
      process.exit();
    });
  });
};

(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas...');
    await CONNECT_DB();

    console.log('2. Connected to MongoDB Cloud Atlas...');
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

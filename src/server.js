/* eslint-disable semi */
/* eslint-disable no-console */

import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb';
import express from 'express';
import AsyncExitHook from 'async-exit-hook';

const START_SERVER = () => {
  const app = express();

  const hostname = 'localhost';
  const port = 8017;

  app.get('/', async (req, res) => {
    try {
      const db = GET_DB();

      const collections = await db.listCollections().toArray();
      console.log(collections);

      res.send(
        '<h1>Hello World!</h1><hr><pre>' +
          JSON.stringify(collections, null, 2) +
          '</pre>'
      );
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://${hostname}:${port}/`);
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

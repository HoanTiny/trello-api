/* eslint-disable semi */
const MONGODB_URI =
  'mongodb+srv://hoantiny01:jRuX1xRfJdAFAP2P@cluster0.qujrqev.mongodb.net/?retryWrites=true&w=majority';

const DB_NAME = 'trello-hoantiny-be';

import { MongoClient, ServerApiVersion } from 'mongodb';

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();

  trelloDatabaseInstance = mongoClientInstance.db(DB_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to Database first');
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  console.log('test close database');
  await mongoClientInstance.close();
};

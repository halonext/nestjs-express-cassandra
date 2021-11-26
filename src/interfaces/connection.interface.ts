import { ExpressCassandraOptions } from './express-cassandra.interface';

export interface Connection {
  isConnected: boolean;
}

export interface ConnectionOptions extends ExpressCassandraOptions {
  name?: string;
}

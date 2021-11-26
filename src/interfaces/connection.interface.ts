import ExpressCassandraClient from '../express-cassandra-client';
import { ExpressCassandraOptions } from './express-cassandra.interface';

export interface Connection extends ExpressCassandraClient {
  isConnected: boolean;
}

export interface ConnectionOptions extends ExpressCassandraOptions {
  name?: string;
}

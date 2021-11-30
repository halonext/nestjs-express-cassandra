import { ExpressCassandraOptions } from './express-cassandra.interface';

export interface ConnectionOptions extends ExpressCassandraOptions {
  name?: string;
}

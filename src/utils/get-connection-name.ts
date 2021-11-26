import { DEFAULT_CONNECTION_NAME } from '../constants';
import { ConnectionOptions } from '../interfaces/connection.interface';

export default function getConnectionName(
  connection: ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
): string {
  return DEFAULT_CONNECTION_NAME === connection
    ? DEFAULT_CONNECTION_NAME
    : 'string' === typeof connection
    ? `${connection}Connection`
    : !connection.name
    ? DEFAULT_CONNECTION_NAME
    : `${connection.name}Connection`;
}

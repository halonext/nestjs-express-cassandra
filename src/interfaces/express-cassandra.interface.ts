import { ClientOptions as DriverOptions } from 'cassandra-driver';

interface ClientOptions extends DriverOptions {
  contactPoints: string[];
  localDataCenter: string;
  keyspace: string;
}

/**
 * Replication Strategy
 * @see https://docs.datastax.com/en/archived/cassandra/3.0/cassandra/architecture/archDataDistributeReplication.html
 */
type ReplicationStrategyType = 'SimpleStrategy' | 'NetworkTopologyStrategy';

/**
 * Migration Strategy
 * @see https://github.com/masumsoft/express-cassandra/blob/master/docs/usage.md#explanations-for-the-options-used-to-initialize
 */
type MigrationStrategyType = 'alter' | 'drop' | 'safe';

/**
 * User-Defined Types (UDTs)
 * https://cassandra.apache.org/doc/latest/cassandra/cql/types.html#udts
 */
type UdtDefinition = Record<string, string>;

/**
 * ExpressCassandra ORM options
 */
interface OrmOptions {
  defaultReplicationStrategy?: {
    class: ReplicationStrategyType;
    replication_factor: number;
  };
  migration?: MigrationStrategyType;
  createKeyspace?: boolean;
  disableTTYConfirmation?: boolean;
  udts?: Record<string, UdtDefinition>;
}

/**
 * ExpressCassandra client options
 */
export interface ExpressCassandraOptions {
  clientOptions: ClientOptions;
  ormOptions?: OrmOptions;
}

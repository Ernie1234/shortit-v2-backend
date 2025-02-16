import express from 'express';
import supertest from 'supertest';
import { Server, createServer } from 'node:http';
import mongoose, { Connection } from 'mongoose';

import routes from '../routes';
import { testDatabaseConfig } from './jest-setup/jest-setup';
import { isContainerRunning, setupMongoContainer, CONTAINER_NAME } from './jest-setup/docker';

const MONGO_URL = `mongodb://${testDatabaseConfig.user}:${testDatabaseConfig.password}@localhost:${testDatabaseConfig.port}/${testDatabaseConfig.database}?authSource=admin`;

export class TestFactory {
  private _app!: express.Application;
  private _connection!: Connection;
  private _server!: Server;

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app) as unknown as supertest.SuperTest<supertest.Test>;
  }

  public async init(): Promise<void> {
    await this.startup();
  }

  public async close(): Promise<void> {
    if (this._server) {
      this._server.close();
    }
    if (this._connection) {
      await this._connection.close();
    }
  }

  private async startup(): Promise<void> {
    try {
      const isRunning = await isContainerRunning(CONTAINER_NAME);
      if (!isRunning) {
        await setupMongoContainer(
          testDatabaseConfig.user,
          testDatabaseConfig.password,
          testDatabaseConfig.port
        );
      }
      const connection = await mongoose.connect(MONGO_URL);
      this._connection = connection.connection;
      this._app = express();
      this._app.use(express.json());
      this._app.use(express.urlencoded({ extended: true }));
      this._app.use('/api/v1', routes);
      this._server = createServer(this._app).listen(3010);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('testing error', error);
    }
  }
}

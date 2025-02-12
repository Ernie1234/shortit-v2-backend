import cors from 'cors';
import express from 'express';

import routes from './routes';
import connectDb from './config/connect';
import logger from './logs/logger';
import envConfig from './config/envConfig';

const { PORT, MONGODB_URL } = envConfig;

export const main = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v2/', routes);

    app.use((req, res) =>
      res.status(404).send({
        message: `This route does not exist: [${req.method}] ${req.url}`
      })
    );

    await connectDb(MONGODB_URL);
    app.listen(PORT, () => {
      logger.info(`Server is started at port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();

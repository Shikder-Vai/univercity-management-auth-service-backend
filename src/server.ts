import mongoose from 'mongoose';

import { Server } from 'http';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);

  process.exit(1);
});

let server: Server;

async function bootstart() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🧠 Brain connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Univercity Management listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`🧠 Brain not connected`, error);
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection detected, server is closing .....');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstart();

process.on('SIGTERM', () => {
  logger.info('Sigterm is resolve');
  if (server) {
    server.close();
  }
});

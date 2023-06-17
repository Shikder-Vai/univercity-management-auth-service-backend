import mongoose from 'mongoose';

import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

async function bootstart() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🧠 Brain connected successfully`);

    app.listen(config.port, () => {
      logger.info(`Univercity Management listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`🧠 Brain not connected`, err);
  }
}

bootstart();

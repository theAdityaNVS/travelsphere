import { Logging } from '@google-cloud/logging';
import { env } from './env';

const logging = new Logging({ projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
const log = logging.log('travelsphere-app-log');

export const logger = {
  info: (message: string, metadata?: Record<string, unknown>) => {
    if (env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, metadata || '');
    } else {
      const entry = log.entry({ severity: 'INFO', ...metadata }, message);
      log.write(entry).catch(console.error);
    }
  },
  error: (message: string, error?: unknown) => {
    if (env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error || '');
    } else {
      const entry = log.entry({ severity: 'ERROR', error }, message);
      log.write(entry).catch(console.error);
    }
  },
  warn: (message: string, metadata?: Record<string, unknown>) => {
    if (env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, metadata || '');
    } else {
      const entry = log.entry({ severity: 'WARNING', ...metadata }, message);
      log.write(entry).catch(console.error);
    }
  }
};

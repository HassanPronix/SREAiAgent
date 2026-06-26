import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',

  // JSON logs for production
  timestamp: pino.stdTimeFunctions.isoTime,

  base: {
    service: process.env.SERVICE_NAME || 'sre-aiops-backend',
    environment: process.env.NODE_ENV || 'production',
  },

  formatters: {
    level(label) {
      return {
        level: label,
      };
    },
  },

  serializers: {
    err: pino.stdSerializers.err,

    error: pino.stdSerializers.err,
  },

  redact: {
    paths: ['password', 'token', 'authorization', 'headers.authorization', 'req.headers.cookie'],
    censor: '[REDACTED]',
  },
});

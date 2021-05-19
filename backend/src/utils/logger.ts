import { createLogger, transports, format } from 'winston';

const { printf, combine, timestamp, errors } = format;

const levels = {
  request: 0,
  global: 1
};

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] [${level}]: ${stack || message}`;
});

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  levels,
  transports: [
    new transports.Console({
      level: 'global'
    }),
    new transports.File({
      filename: 'logs/requests.log',
      level: 'request'
    })
  ]
});

export default logger;

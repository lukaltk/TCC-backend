import winston from 'winston';

import { environment } from '../config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const env = environment;
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors);

const format = winston.format.combine(
  winston.format(info => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  winston.format.timestamp(),
  winston.format.colorize({ level: true }),
  winston.format.printf(
    (info) => {
      let format = `[${info.timestamp}] ${info.level}: ${info.message}`;

      if (info instanceof Error) {
        const data = JSON.stringify(info);

        const errorData = `\n[${info.timestamp}] ${info.level}: ${data}`;
        const errorStack = `\n[${info.timestamp}] ${info.level}: ${info.stack}`;

        format = format.concat(errorData, errorStack);
      };

      return format
    }
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

export default Logger;
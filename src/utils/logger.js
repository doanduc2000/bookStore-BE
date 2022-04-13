const pinoLogger = require('pino');

const pino = pinoLogger();

const generateLogger = (level) => (msg, obj) => {
  const isObject = obj !== null && typeof obj === 'object';

  if (isObject) {
    pino[level](obj, msg);
  } else {
    pino[level](!obj ? msg : `${obj} - ${msg}`);
  }
};

const trace = ({ level = 'info', tag = 'TRACE', uuid, message, data }) => {
  pino[level]({
    tag,
    info: { uuid, level: level.toUpperCase(), message, data },
  });
};

const FATAL = 'fatal';
const ERROR = 'error';
const WARN = 'warn';
const INFO = 'info';
const DEBUG = 'debug';

module.exports = {
  FATAL,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  fatal: generateLogger(FATAL),
  error: generateLogger(ERROR),
  warn: generateLogger(WARN),
  info: generateLogger(INFO),
  debug: generateLogger(DEBUG),
  trace,
};

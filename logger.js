const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, json } = format;

const logger = createLogger({
  transports: [new transports.Console()],
});

const userLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/user.log", level: "info" }),
  ],
});

const postLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/post.log", level: "info" }),
  ],
});

const seriesLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/series.log", level: "info" }),
  ],
});

const messageLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/message.log", level: "info" }),
  ],
});

const commitmentLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/commit.log", level: "info" }),
  ],
});

const requestLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/request.log", level: "info" }),
  ],
});

const interestLogger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "logs/interest.log", level: "info" }),
  ],
});

module.exports = {
  userLogger,
  postLogger,
  seriesLogger,
  messageLogger,
  commitmentLogger,
  requestLogger,
  interestLogger,
};

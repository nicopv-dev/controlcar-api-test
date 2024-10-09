import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

const myFormat = () =>
  printf(
    ({ level, message, label, timestamp }) =>
      `${timestamp}[${label}] ${level}:${message}`
  );

const format = combine(
  colorize({ all: true }),
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  align(),
  myFormat()
);

export const logger = winston.createLogger({
  level: "info",
  format,
  defaultMeta: { label: "CONTROL_CAR" },
  transports: [new winston.transports.Console()],
});

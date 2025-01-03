import logger from "../utils/logger.utils";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(" ")[0],
        url: message.split(" ")[1],
        status: message.split(" ")[2],
        responseTime: `${message.split(" ")[3]} ms`,
      };
      logger.info(JSON.stringify(logObject));
    },
  },
});

export default morganMiddleware;

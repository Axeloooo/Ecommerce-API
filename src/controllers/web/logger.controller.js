export async function getLoggerTest(req, res, next) {
  try {
    req.logger.info("Info");
    req.logger.error("Error");
    req.logger.warn("Warn");
    req.logger.debug("Debug");
    req.logger.http("Http");
    res.send("Logger test");
  } catch (err) {
    next(err);
  }
}

import mongoose from "mongoose";
import log from "./logger.js";
async function mongoConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info("DB Connection Successful!")
  } catch (error) {
    log.error("Could not connect to the database")
    log.error(error.message)
    process.exit(1)

  }
}
export default mongoConnect;

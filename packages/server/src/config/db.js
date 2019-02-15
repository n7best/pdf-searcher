const mongoose = require("mongoose");
const { mongo, env } = require("./vars");

// Exit application on error
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === "development") {
  mongoose.set("debug", true);
}

const connect = async () => {
  await mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useNewUrlParser: true
  });

  console.log("[database] connected");
  return mongoose.connection;
};

export default {
  connect
};

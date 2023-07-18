const express = require("express");
const cors = require("cors");
const connect = require("./config/database-config");
const { PORT } = require("./config/server-config");
const routing = require("./routes/index");
const umodel = require("./models/users");
const { userService } = require("./services/index");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use("/api", routing);

const startServer = () => {
  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await connect();
    // await umodel.create({
    //   email: "adminn@gmail.com",
    //   password: "12345",
    //   username: "adminn",
    // });
    // const user = new userService();
    // user.followToggle("64402f7589520ad9aa41e6c2", "64403b1c55c675718d051436");
  });
};
startServer();

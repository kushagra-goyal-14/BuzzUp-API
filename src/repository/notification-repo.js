const crud = require("./crud");
const Notification = require("../models/notifications");
class notificationRepo extends crud {
  constructor() {
    super(Notification);
  }
}
module.exports = notificationRepo;

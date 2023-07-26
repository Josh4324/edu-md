const cron = require("node-cron");
const { format, compareAsc } = require("date-fns");

const cronReminder = () => {
  console.log("starting cron");
  cron.schedule("* * * * *", async () => {
    console.log("running every 1 minutes");
  });
};

module.exports = cronReminder;

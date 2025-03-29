import Task from "../models/Task.js";
import User from "../models/User.js";
import { sendEmail } from "./emailService.js";

export const checkTaskDeadlines = async () => {
  const tasks = await Task.find({ completed: false }).populate(
    "userId",
    "email"
  );

//   tasks.forEach(async (task) => {
//     const deadline = new Date(task.deadline);
//     const now = new Date();
//     const timeDiff = deadline - now;

//     if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 10000) {
//       await sendEmail(
//         task.userId.email,
//         "Task Deadline Reminder",
//         `Your task "${task.title}" is due in less than 24 hours`
//       );
//     }
//   });
};

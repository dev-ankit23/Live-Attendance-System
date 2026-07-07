import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

export default mongoose.model("Attendance", attendanceSchema);

import mongoose, { InferSchemaType } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export type NotificationType = Omit<
  InferSchemaType<typeof notificationSchema>,
  ""
> & {
  _id: mongoose.Types.ObjectId | string;
};

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;

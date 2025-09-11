import mongoose, { InferSchemaType } from "mongoose";

const withdrawRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export type WithdrawRequestType = Omit<
  InferSchemaType<typeof withdrawRequestSchema>,
  ""
> & {
  _id: mongoose.Types.ObjectId | string;
};

const WithdrawRequest =
  mongoose.models.WithdrawRequest ||
  mongoose.model("WithdrawRequest", withdrawRequestSchema);

export default WithdrawRequest;

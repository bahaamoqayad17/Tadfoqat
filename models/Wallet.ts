import mongoose, { InferSchemaType } from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    balance: {
      type: String,
      trim: true,
    },
    withdrawable_balance: {
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

export type WalletType = Omit<InferSchemaType<typeof walletSchema>, ""> & {
  _id: mongoose.Types.ObjectId | string;
};

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;

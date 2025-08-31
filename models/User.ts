import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    passwordConfirm: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    mobile_number: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc: any, ret: any) {
    delete (ret as any).password;
    delete (ret as any).passwordConfirm;
    return ret;
  },
});

export type UserType = Omit<InferSchemaType<typeof userSchema>, "role"> & {
  _id: mongoose.Types.ObjectId | string;
  username: string;
  email: string;
  password?: string; // Optional because it gets deleted in toJSON
  passwordConfirm?: string; // Optional because it gets deleted in toJSON
  name: string;
  mobile_number?: string;
  position?: string;
  isVerified: boolean;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

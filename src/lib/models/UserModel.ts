import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;

export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

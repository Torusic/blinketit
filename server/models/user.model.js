import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name"],
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    unique: true,
    index: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Provide password"],
  },
  avatar: {
    type: String,
    default: "",
    match: [/^https?:\/\/.+/, "Avatar must be a valid URL"],
  },
  mobile: {
    type: Number,
    default: null,
    index: true,
  },
  refresh_token: {
    type: String,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  last_login_date: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active",
  },
  address_details: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
  ],
  shopping_cart: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "cartProduct",
    },
  ],
  orderHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "order",
    },
  ],
  forgot_password_otp: {
    type: String,
    default: null,
  },
  forgot_password_expiry: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
}, {
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

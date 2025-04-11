import mongoose from 'mongoose';
const { Schema } = mongoose;

const OtpSchema = new Schema(
  
  {
    otp: { type: Number },
    email: { type: String,default:"" }
  },
 
  {
    collection: "otps",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Otp = mongoose.model("otps", OtpSchema);

export default Otp;

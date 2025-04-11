import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  
  {
    otp: { type: Number },
    email: { type: String,default:"" }
  },
 
  {
    collection: "Otp",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);

export default Otp;

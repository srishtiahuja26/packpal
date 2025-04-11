import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  status: { type: String, enum: ['To Pack', 'Packed', 'Delivered'], default: 'To Pack' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }
});

export default mongoose.models.Item || mongoose.model('Items', itemSchema);

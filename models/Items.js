import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  status: { type: String, enum: ['To Pack', 'Packed', 'Delivered'], default: 'To Pack' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userRole : { type: String, enum: ['Owner', 'Admin', 'Member', 'Viewer'], default: 'Member' },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }
});

export default mongoose.models.Items || mongoose.model('Items', itemSchema);

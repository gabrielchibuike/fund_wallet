import mongoose from "mongoose";

const details = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountBalance: { type: String, required: true },
  sender_id: { type: String, required: true },
  sender_name: { type: String, required: true },
  sender_number: { type: String, required: true },
  amount_sent: { type: String, required: true },
  time_sent: { type: String, required: true },
});

const accSchema = mongoose.model('account_details', details);

export default accSchema;

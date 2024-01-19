import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import accSchema from "./model/accout_details";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Bank_App");

app.post("/api/v0/fund_account", async (req: Request, res: Response) => {
  const {
    _id,
    accountNumber,
    amount,
  }: { _id: string; accountNumber: string; amount: number } = req.body;
  try {
    const query = await accSchema.findOne({ accountNumber: accountNumber });
    const access_acc_num = query!.accountBalance as unknown as number;
    const newAmount = Number(access_acc_num) + amount;
    try {
      const sender_id = await accSchema.findOne({ _id });
      const sender_name = sender_id?.accountName;
      const sender_number = sender_id?.accountNumber;
        const options: Intl.DateTimeFormatOptions = {
          weekday: "short", 
          day: "numeric", 
          month: "short", 
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
      const query2 = await accSchema.findOneAndUpdate(
        { accountNumber: accountNumber },
        {
          accountBalance: newAmount,
          sender_name: sender_name,
          sender_number: sender_number,
          amount_sent: amount,
          time_sent: new Date().toLocaleDateString("en-US", options),
        },
        { new: true }
      );
      res.json({status : 200 , data : query2})
    } catch (innerErr) {
       res.json({ status: 500, data: innerErr });
    }
  } catch (outerErr) {
    res.statusCode;
  }
});

app.listen("8000", async () => {
  try {
    console.log("server is running on port ");
  } catch (err) {
    console.log(err);
  }
});

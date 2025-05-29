import mongoose from "mongoose"
import Counter from "./Counter.js";

const employeeSchema = new mongoose.Schema({
    employeeId:{
        type: Number,
        required: false,
        unique: true
        },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    countryCode:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
},
    {timestamps: true}
)

employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    console.log("Counter doc:", counter);
    if (!counter) {
      return next(new Error("Counter document not found or created"));
    }
    this.employeeId = 100 + counter.sequence_value - 1;
  }
  next();
});


const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
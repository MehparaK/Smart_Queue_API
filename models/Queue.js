const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Waiting", "Serving", "Completed"], 
    default: "Waiting" 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Queue", queueSchema);
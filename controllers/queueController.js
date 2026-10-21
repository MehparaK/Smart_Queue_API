const Queue = require("../models/Queue");
const {ErrorHandler} = require("../utils/ErrorHandler");

const getAllQueue = async (req, res, next) => {
  try {
    const queueItems = await Queue.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, count: queueItems.length, queue: queueItems });
  } catch (error) {
    next(error);
  }
};

const getQueueById = async (req, res, next) => {
  try {
    const customer = await Queue.findById(req.params.id);
    if (!customer) {
      return next(new ErrorHandler("Customer not found", 404));
    }

    let position = null;
    if (customer.status === "Waiting") {
      position = await Queue.countDocuments({
        status: "Waiting",
        createdAt: { $lt: customer.createdAt }
      }) + 1;
    }

    res.status(200).json({ success: true, customer, position });
  } catch (error) {
    return next(new ErrorHandler("Invalid customer ID", 400));
  }
};

const createQueueItem = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new ErrorHandler("Customer name is required.", 400));
    }
    const newCustomer = await Queue.create({
      name,
      status: "Waiting",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    res.status(201).json({ success: true, customer: newCustomer });
  } catch (error) {
    next(error);
  }
};

const callNextCustomer = async (req, res, next) => {
  try {
    const nextCustomer = await Queue.findOneAndUpdate(
      { status: "Waiting" },
      { status: "Serving", updatedAt: Date.now() },
      { sort: { createdAt: 1 }, new: true }
    );

    if (!nextCustomer) {
      return next(new ErrorHandler("No waiting customers in the queue", 404));
    }

    res.status(200).json({ 
      success: true, 
      message: "Next customer called successfully", 
      customer: nextCustomer 
    });
  } catch (error) {
    next(error);
  }
};

const deleteQueueItem = async (req, res, next) => {
  try {
    const customer = await Queue.findByIdAndDelete(req.params.id);
    if (!customer) {
      return next(new ErrorHandler("Customer not found", 404));
    }
    res.status(200).json({ success: true, message: "Customer removed from queue successfully" });
  } catch (error) {
    return next(new ErrorHandler("Invalid customer ID", 400));
  }
};

module.exports = {
  getAllQueue,
  getQueueById,
  createQueueItem,
  callNextCustomer,
  deleteQueueItem,
};
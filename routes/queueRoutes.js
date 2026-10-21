const express = require("express");
const router = express.Router();

const {
  getAllQueue,
  getQueueById,
  createQueueItem,
  callNextCustomer,
  deleteQueueItem,
} = require("../controllers/queueController");

router.route("/").get(getAllQueue).post(createQueueItem);
router.route("/next").post(callNextCustomer);
router.route("/:id").get(getQueueById).delete(deleteQueueItem);

module.exports = router;
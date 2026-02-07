const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

//Creating index to optimized the serching in documents.
connectionRequestSchema.index({ fromUserID: 1, toUserId: 1 });

//It will be gets called every when before the save() call for this connectionRequest model
connectionRequestSchema.pre("save", async function () {
  const fromUserID = this.fromUserId;
  const toUserId = this.toUserId;

  if (fromUserID.equals(toUserId))
    throw new Error("Can't send request to yourself");
});

const connectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = {
  connectionRequestModel,
};

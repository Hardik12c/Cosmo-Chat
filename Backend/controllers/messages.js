const MessageSchema = require("../models/Messages");
const { StatusCodes } = require("http-status-codes");

const getallmessages = async (req, res) => {
  try {
    const Messages = await MessageSchema.find({});
    res.status(StatusCodes.OK).json({ Messages });
  } catch (error) {
    console.log(error);
  }
};

const createamessage = async (req, res) => {
  req.body.createdby = req.user.id;
  const message = await MessageSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({message});
};

module.exports = { getallmessages, createamessage };

const MessageSchema = require("../models/Messages");
const { StatusCodes } = require("http-status-codes");

const getallmessages = async (req, res) => {
  try {
    const Messages = await MessageSchema.find({}).sort({date:1});
    res.status(StatusCodes.OK).json({ Messages });
  } catch (error) {
    console.log(error);
  }
};

const createamessage = async (req, res) => {
  try {
    req.body.createdby = req.user.id;
    req.body.name=req.user.name;
    const message = await MessageSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({message});
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getallmessages, createamessage };

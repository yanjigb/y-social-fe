import messageService from "../../services/message.service";
import {
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailed,
  updateMessageStart,
  updateMessageSuccess,
  updateMessageFailed,
  deleteMessageStart,
  deleteMessageSuccess,
  deleteMessageFailed,
  getMessageStart,
  getMessageSuccess,
  getMessageFailed,
} from "../messageSlice";

export const sendMessage = async (message, dispatch) => {
  dispatch(sendMessageStart());
  try {
    const res = await messageService.sendMessage(message);
    dispatch(sendMessageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(sendMessageFailed());
    console.error(error);
  }
};

export const getMessagesByRoomID = async (roomID, dispatch) => {
  dispatch(getMessageStart());
  try {
    const res = await messageService.getAllMessagesByRoomID(roomID);
    dispatch(getMessageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getMessageFailed());
    console.error(error);
  }
};

export const deleteMessage = async (msgID, dispatch) => {
  dispatch(deleteMessageStart());
  try {
    await messageService.deleteMessage(msgID);
    dispatch(deleteMessageSuccess());
  } catch (error) {
    dispatch(deleteMessageFailed());
    console.error(error);
  }
};

export const getMessageByID = async (msgID, dispatch) => {
  dispatch(getMessageStart());

  try {
    const res = await messageService.getMessageByID(msgID);
    dispatch(getMessageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getMessageFailed());
    console.error(error);
  }
};

export const updateMessage = async (msgID, dispatch) => {
  dispatch(updateMessageStart());

  try {
    const res = await messageService.updateMessage(msgID);
    dispatch(updateMessageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateMessageFailed());
    console.error(error);
  }
};

export const markMessageSeen = async (msg, dispatch) => {
  dispatch(updateMessageStart());

  try {
    const res = await messageService.updateMessage(msg);
    dispatch(updateMessageSuccess(res.data));

    return res.data;
  } catch (error) {
    dispatch(updateMessageFailed());
    console.error(error);
  }
};

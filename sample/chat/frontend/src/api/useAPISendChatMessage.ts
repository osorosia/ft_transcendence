import { axiosInstance } from "../utils/url";

const sendChatMessage = async (message: any): Promise<any> => {
	const res = await axiosInstance.post("/chat/send-message", message, {});
	return res.data;
};

export const useAPISendChatMessage = (message: any) => {
	return sendChatMessage(message);
};

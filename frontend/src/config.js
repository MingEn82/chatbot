import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "TradingBot",
  initialMessages: [
    createChatBotMessage("Good day! What do you want to know about TSLA"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
};

export default config;

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("Good day to you!");
    this.updateChatbotState(greetingMessage);
  }

  async queryAnswer(question) {
    let formData = new FormData();
    formData.append('question', question);
    await fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      res.json().then((data) => {
        console.log(data['answer']);
        const answer = this.createChatBotMessage(data['answer']);
        this.updateChatbotState(answer);
      });
    }).catch(e => {
      console.log(e);
      const answer = this.createChatBotMessage("Apologies, an error occurred. Please try again!");
      this.updateChatbotState(answer);
    })
  }

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;

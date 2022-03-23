class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage
    //  ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

    //to greet the user
    greet() {
        const greetingMessage = this.createChatBotMessage("Hi, friend.")
        this.updateChatbotState(greetingMessage)
    }

    //to give reply to a randome message by the user
    random() {
        const greetingMessage = this.createChatBotMessage("Sorry, I didn't understand your question. Here are some things I can help you with:",
            {
                widget: "AllLinks",
            },)
        this.updateChatbotState(greetingMessage)
    }
    
    //update messages array with the new message
    updateChatbotState(message) {     
       this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }

    //reply to housing related questions
    handleHouseList = () => {
        const message = this.createChatBotMessage(
          "Fantastic, some of the popular websites for finding affordable accomodations are given below. To get more detailed information, you can also check our housing card on the main page.",
          {
            widget: "HousingLinks",
          },
        );
    
        this.updateChatbotState(message);
    };

    //reply to banking related questions
    handleBankList = () => {
        const message = this.createChatBotMessage(
          "Fantastic, some well known banks in Canada are:",
          {
            widget: "BankingLinks",
          },
        );
    
        this.updateChatbotState(message);
    };

    //reply to document/ID related questions
    handleDocList = () => {
        const message = this.createChatBotMessage(
          "Sure! All provinces need different IDs. Some common ones that you'd need as a student are:",
          {
            widget: "DocLinks",
          },
        );
    
        this.updateChatbotState(message);
    };

    //reply to community related questions
    handleComm = () => {
      const message = this.createChatBotMessage(
        "You can become a member of various communities to discuss and get valuable information.",
        {
          widget: "CommunityLinks",
        },
      );
  
      this.updateChatbotState(message);
    }

    house() {
        this.handleHouseList();
    }

    bank() {
        this.handleBankList();
    }

    doc() {
        this.handleDocList();
    }

    comm() {
        this.handleComm();
    }

 }

 export default ActionProvider;
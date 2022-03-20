class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCaseMessage = message.toLowerCase()
    
        if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey"))
          this.actionProvider.greet()
        else if (lowerCaseMessage.includes("house") || lowerCaseMessage.includes("housing") || lowerCaseMessage.includes("home") || lowerCaseMessage.includes("rent") ||lowerCaseMessage.includes("rental") || lowerCaseMessage.includes("apartment") || lowerCaseMessage.includes("townhouse") || lowerCaseMessage.includes("accomodation"))
          this.actionProvider.house()
        else if(lowerCaseMessage.includes("bank") || lowerCaseMessage.includes("banks") || lowerCaseMessage.includes("banking") || lowerCaseMessage.includes("financial") || lowerCaseMessage.includes("finance"))
          this.actionProvider.bank()
        else if(lowerCaseMessage.includes("document") || lowerCaseMessage.includes("documents") || lowerCaseMessage.includes("id") || lowerCaseMessage.includes("ids"))
          this.actionProvider.doc()
        else
          this.actionProvider.random()
    }
  }
  
  export default MessageParser;
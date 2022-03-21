import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "./LearningOptions";
import LinkList from "./LinkList";

const Config = {
    botName: "Guide Bot",
    initialMessages: [createChatBotMessage(`Hi, I'm here to help. What are you looking for?`, {widget: "learningOptions",})],
    customStyles: {
        botMessageBox: {
          backgroundColor: "lightgrey",
        },
        chatButton: {
          backgroundColor: "#6b5b95",
        },
      },
      widgets: [
        {
            widgetName: "learningOptions",
           widgetFunc: (props) => <LearningOptions {...props} />,
        },
        {
          widgetName: "HousingLinks",
          widgetFunc: (props) => <LinkList {...props} />,
          props: {
            options: [
              {
                text: "Kijiji",
                url:
                  "https://www.kijiji.ca/",
                id: 1,
              },
              {
                text: "Mainstreet",
                url:
                  "https://www.mainst.biz/",
                id: 2,
              },
              {
                text: "3J Holdings",
                url: "https://3jholdingscorporation.managebuilding.com/Resident/public/rentals",
                id: 3,
              },
            ],
          },
        },
        {
          widgetName: "BankingLinks",
          widgetFunc: (props) => <LinkList {...props} />,
          props: {
            options: [
              {
                text: "Scotia Bank",
                id: 1,
              },
              {
                text: "CIBC",
                id: 2,
              },
              {
                text: "TD",
                id: 3,
              },
              {
                text: "RBC",
                id: 3,
              },
            ],
          },
        },
        {
          widgetName: "DocLinks",
          widgetFunc: (props) => <LinkList {...props} />,
          props: {
            options: [
              {
                text: "Driving license if you plan on driving",
                id: 1,
              },
              {
                text: "Study permit",
                id: 2,
              },
              {
                text: "Co-op work permit if you wish to opt for co-op",
                id: 3,
              },
              {
                text: "Provincial ID",
                id: 3,
              },
            ],
          },
        },
        {
            widgetName: "CommunityLinks",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
              options: [
                {
                  text: "Visit our community page",
                  id: 1,
                },
              ],
            },
          },
    ],
}

export default Config;
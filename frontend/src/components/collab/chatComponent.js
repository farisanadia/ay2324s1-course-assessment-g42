import React, { useEffect, useRef, useState } from "react";
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import io from 'socket.io-client';
import Linkify from 'react-linkify';

function ChatComponent({roomId}) {
    const chatSocketRef = useRef();
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);


    const sendMessage = (message) => {
      const updatedMessages = [...messages, {
        message,
        direction: 'outgoing'
      }];
      setMessages(updatedMessages);
      setMsgInputValue("");
      sessionStorage.setItem(`chat_${roomId}`, JSON.stringify(updatedMessages));
      inputRef.current.focus();
      chatSocketRef.current.emit('send-message', message, roomId);
    }

    const receiveMessage = (message) => {
      const updatedMessages = [...messages, {
        message,
        direction: 'incoming'
      }];
      setMessages(updatedMessages);
      sessionStorage.setItem(`chat_${roomId}`, JSON.stringify(updatedMessages));
    }

    useEffect(() => {
        if (!chatSocketRef.current) {
            chatSocketRef.current = io('http://localhost:5003',  { transports : ['websocket'] });
            chatSocketRef.current.emit('join-chat', roomId);
        }

        chatSocketRef.current.on('receive-message', (message) => {
            console.log('received message in ' + message);
            receiveMessage(message);
        });

        chatSocketRef.current.on('loadChatHistory', () => {
            const chatHistory = sessionStorage.getItem(`chat_${roomId}`);
            if (chatHistory) {
              setMessages(JSON.parse(chatHistory));
            }
        });
    })

    return (
        <ChatContainer>
          <MessageList scrollBehavior="smooth">
            {messages.map((m, i) => 
              <Message key={i} model={m.direction} >
                <Message.CustomContent>
                  <Linkify>
                    {m.message}
                  </Linkify>
                </Message.CustomContent>
              </Message>)}
          </MessageList >
          <MessageInput attachButton={false} placeholder="Type message here" onSend={sendMessage} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef}/>
        </ChatContainer>
          )
}

export default ChatComponent;

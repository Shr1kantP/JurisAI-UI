import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { Send } from 'lucide-react';

const Landing: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to LegalAssist. How can I help you with your legal matters today?", sender: "assistant" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newUserMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
      setMessages(prev => [...prev, newUserMessage]);
      setInputValue('');

      try {
        const response = await fetch("http://127.0.0.1:5000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fir: inputValue })
        });

        const data = await response.json();
        const assistantResponse = {
          id: messages.length + 2,
          text: `Suggested IPC Sections: ${data.matches.map((m: any) => `${m[0]} (${m[1]})`).join(", ")}`,
          sender: "assistant"
        };

        setMessages(prev => [...prev, assistantResponse]);
      } catch (error) {
        setMessages(prev => [...prev, { id: messages.length + 2, text: "Error connecting to backend!", sender: "assistant" }]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`p-2 my-2 max-w-xl rounded-lg shadow ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <footer className="p-4 bg-white flex">
        <textarea 
          className="flex-1 border p-2" 
          placeholder="Enter legal query..."
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded">
          <Send size={20} />
        </button>
      </footer>
    </div>
  );
};

export default Landing;

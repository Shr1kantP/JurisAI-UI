import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Menu, X, Send, User, MessageSquare, FileText, History, Settings, LogOut, Zap, Component, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to LegalAssist. How can I help you with your legal matters today?", sender: "assistant" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user"
      };

      setMessages(prev => [...prev, newUserMessage]);
      setInputValue('');

      setTimeout(() => {
        const assistantResponse = {
          id: messages.length + 2,
          text: "I understand your legal question. Let me provide some relevant information based on case law and statutes...",
          sender: "assistant"
        };

        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: sidebarOpen ? '256px' : '0px' }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-50 bg-gray-900 text-white overflow-hidden shadow-2xl"
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold flex items-center"
            >
              <Zap className="mr-2 text-yellow-400" />
              JurisAI
            </motion.h1>
            <button onClick={toggleSidebar} className="text-white hover:text-yellow-400 transition">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-6 flex-grow">
            {['Main', 'Resources', 'User'].map((section, sectionIndex) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-2">{section}</h2>
                <ul className="space-y-2">
                  {section === 'Main' && (
                    <li>
                      <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                        <MessageSquare size={20} />
                        <span>New Chat</span>
                      </a>
                    </li>
                  )}
                  {section === 'Resources' && (
                    <>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <FileText size={20} />
                          <span>Legal Templates</span>
                        </a>
                      </li>
                        <li>
                        <a href="/history" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <History size={20} />
                          <span>History</span>
                        </a>
                        </li>
                    </>
                  )}
                  {section === 'User' && (
                    <>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <User size={20} />
                          <span>Account</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <Settings size={20} />
                          <span>Settings</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <LogOut size={20} />
                          <span>Logout</span>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md p-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 hover:text-blue-600 transition">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center">
              <Zap className="mr-2 text-yellow-500" />
              JurisAI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
          </div>
        </motion.header>

        {/* Messages Area */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-6 pb-24">
            <AnimatePresence>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-xl shadow-lg ${message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
        </main>

        {/* Input Area */}
        <footer className="bg-white border-t p-4 shadow-inner">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center bg-gray-100 rounded-xl px-4 py-2 shadow-sm"
            >
              <textarea
                className="flex-1 bg-transparent outline-none resize-none max-h-32 text-gray-800 p-2"
                placeholder="Type your legal question here..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Send size={18} />
              </motion.button>
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              JurisAI provides information based on legal resources but is not a substitute for professional legal advice.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
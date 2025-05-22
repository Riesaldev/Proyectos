import React, { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { Message, User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useChatStore } from '../../store/chatStore';

interface ChatInterfaceProps {
  currentUser: User;
  chatPartner: User;
  onVideoCallClick?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  chatPartner,
  onVideoCallClick,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    sendMessage, 
    fetchMessages, 
    activeChat,
    setActiveChat, 
    reportMessage,
    isLoading 
  } = useChatStore();
  
  // Fetch messages when chat partner changes
  useEffect(() => {
    setActiveChat(chatPartner.id);
    fetchMessages(chatPartner.id);
    
    // Cleanup
    return () => {
      setActiveChat(null);
    };
  }, [chatPartner.id, fetchMessages, setActiveChat]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages[chatPartner.id]]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    await sendMessage(chatPartner.id, newMessage);
    setNewMessage('');
  };
  
  const handleReportMessage = async (messageId: string) => {
    await reportMessage(messageId);
    setShowReportMenu(null);
  };
  
  const chatMessages = messages[chatPartner.id] || [];
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Avatar 
            src={chatPartner.photos[0] || undefined}
            alt={chatPartner.name}
            size="md"
            status="online"
          />
          <div className="ml-3">
            <h3 className="font-medium">{chatPartner.name}</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        
        <div>
          {onVideoCallClick && (
            <Button
              variant="primary"
              size="sm"
              onClick={onVideoCallClick}
            >
              Video Call
            </Button>
          )}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-primary-100 p-4 rounded-full mb-4">
                  <Send size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No messages yet</h3>
                <p className="text-sm text-gray-600">
                  Say hi to {chatPartner.name} and start a conversation!
                </p>
              </div>
            ) : (
              chatMessages.map((message) => {
                const isCurrentUser = message.sender === currentUser.id;
                
                return (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isCurrentUser && (
                      <Avatar
                        src={chatPartner.photos[0] || undefined}
                        alt={chatPartner.name}
                        size="sm"
                        className="mr-2 self-end"
                      />
                    )}
                    
                    <div className="max-w-[70%]">
                      <div 
                        className={`relative group p-3 rounded-lg ${
                          isCurrentUser 
                            ? 'bg-primary-500 text-white rounded-br-none' 
                            : 'bg-white border rounded-bl-none'
                        }`}
                      >
                        {message.content}
                        
                        {/* Report option for received messages */}
                        {!isCurrentUser && (
                          <button 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setShowReportMenu(message.id)}
                          >
                            <MoreVertical size={16} className="text-gray-500" />
                          </button>
                        )}
                        
                        {/* Report menu */}
                        {showReportMenu === message.id && (
                          <div className="absolute top-0 right-0 mt-6 bg-white shadow-lg rounded-md overflow-hidden z-10">
                            <button 
                              className="px-4 py-2 text-sm text-error-600 hover:bg-error-50 flex items-center w-full"
                              onClick={() => handleReportMessage(message.id)}
                            >
                              <Flag size={14} className="mr-2" />
                              Report message
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-right' : ''
                        } text-gray-500`}
                      >
                        {format(new Date(message.timestamp), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-primary-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="rounded-l-none rounded-r-full"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
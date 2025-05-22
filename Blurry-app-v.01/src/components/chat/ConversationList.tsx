import React from 'react';
import { format } from 'date-fns';
import { User, Message } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface ConversationProps {
  user: User;
  lastMessage?: Message;
  unreadCount?: number;
  isActive?: boolean;
  onClick: () => void;
}

const Conversation: React.FC<ConversationProps> = ({
  user,
  lastMessage,
  unreadCount = 0,
  isActive = false,
  onClick,
}) => {
  const hasUnread = unreadCount > 0;
  
  return (
    <div 
      className={`
        flex items-center p-3 rounded-lg cursor-pointer transition-colors
        ${isActive ? 'bg-primary-50' : 'hover:bg-gray-50'}
      `}
      onClick={onClick}
    >
      <Avatar
        src={user.photos[0] || undefined}
        alt={user.name}
        size="md"
        status="online"
      />
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className={`font-medium truncate ${hasUnread ? 'text-gray-900' : 'text-gray-700'}`}>
            {user.name}
          </h3>
          
          {lastMessage && (
            <span className="text-xs text-gray-500">
              {format(new Date(lastMessage.timestamp), 'h:mm a')}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          {lastMessage ? (
            <p className={`text-sm truncate ${hasUnread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
              {lastMessage.sender === user.id ? '' : 'You: '}
              {lastMessage.content}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No messages yet
            </p>
          )}
          
          {hasUnread && (
            <Badge variant="primary" className="ml-2 min-w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConversationListProps {
  conversations: User[];
  messages: Record<string, Message[]>;
  activeConversation: string | null;
  onSelectConversation: (userId: string) => void;
  currentUserId: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  messages,
  activeConversation,
  onSelectConversation,
  currentUserId,
}) => {
  // Count unread messages for each conversation
  const getUnreadCount = (userId: string): number => {
    const conversationMessages = messages[userId] || [];
    return conversationMessages.filter(
      (msg) => msg.recipient === currentUserId && !msg.read
    ).length;
  };
  
  // Get the last message in a conversation
  const getLastMessage = (userId: string): Message | undefined => {
    const conversationMessages = messages[userId] || [];
    return conversationMessages.length > 0 
      ? conversationMessages[conversationMessages.length - 1] 
      : undefined;
  };
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Messages</h2>
        
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No conversations yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((user) => (
              <Conversation
                key={user.id}
                user={user}
                lastMessage={getLastMessage(user.id)}
                unreadCount={getUnreadCount(user.id)}
                isActive={activeConversation === user.id}
                onClick={() => onSelectConversation(user.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
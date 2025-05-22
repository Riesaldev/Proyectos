import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, LogOut, User, Settings, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMatchStore } from '../store/matchStore';
import { useChatStore } from '../store/chatStore';
import { useVideoCallStore } from '../store/videoCallStore';
import MatchCard from '../components/matching/MatchCard';
import ProfileCard from '../components/profile/ProfileCard';
import ConversationList from '../components/chat/ConversationList';
import ChatInterface from '../components/chat/ChatInterface';
import VideoCallPanel from '../components/video/VideoCallPanel';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'messages' | 'profile'>('discover');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [videoCallPartner, setVideoCallPartner] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { potentialMatches, matches, fetchPotentialMatches, fetchMatches, likeUser, passUser } = useMatchStore();
  const { messages, activeChat, fetchMessages } = useChatStore();
  const { initiateCall, activeCall, endCall } = useVideoCallStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    fetchPotentialMatches();
    fetchMatches();
  }, [isAuthenticated, navigate, fetchPotentialMatches, fetchMatches]);
  
  // Get all users I've matched with for the conversation list
  const getMatchedUsers = () => {
    if (!matches.length) return [];
    
    // In a real app, you'd fetch the actual user objects
    // This is a mock implementation
    return [
      {
        id: '101',
        email: 'emma@example.com',
        name: 'Emma Wilson',
        age: 27,
        gender: 'female',
        location: 'New York, NY',
        bio: 'Passionate about dance and literature',
        interests: ['dancing', 'reading', 'yoga'],
        photos: ['https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        isVerified: true,
        createdAt: new Date(),
        preferences: {
          ageRange: { min: 25, max: 35 },
          distance: 15,
          genderPreference: ['male'],
          interests: ['music', 'travel'],
        },
      },
      {
        id: '102',
        email: 'sophia@example.com',
        name: 'Sophia Martinez',
        age: 29,
        gender: 'female',
        location: 'Boston, MA',
        bio: 'Art curator and wine enthusiast',
        interests: ['art', 'wine tasting', 'museums'],
        photos: ['https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        isVerified: true,
        createdAt: new Date(),
        preferences: {
          ageRange: { min: 27, max: 38 },
          distance: 20,
          genderPreference: ['male'],
          interests: ['art', 'culture'],
        },
      },
    ];
  };
  
  const matchedUsers = getMatchedUsers();
  
  const handleLikeUser = async (userId: string) => {
    await likeUser(userId);
  };
  
  const handlePassUser = async (userId: string) => {
    await passUser(userId);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleSelectChat = (userId: string) => {
    setSelectedChat(userId);
    fetchMessages(userId);
  };
  
  const handleStartVideoCall = async (userId: string) => {
    try {
      await initiateCall(userId);
      setIsInVideoCall(true);
      setVideoCallPartner(userId);
    } catch (error) {
      console.error('Failed to start video call', error);
    }
  };
  
  const handleEndVideoCall = async () => {
    await endCall();
    setIsInVideoCall(false);
    setVideoCallPartner(null);
  };
  
  // Find the current video call partner's info
  const videoCallPartnerInfo = matchedUsers.find(u => u.id === videoCallPartner);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {isInVideoCall && videoCallPartnerInfo ? (
        <VideoCallPanel
          partnerId={videoCallPartnerInfo.id}
          partnerName={videoCallPartnerInfo.name}
          partnerPhoto={videoCallPartnerInfo.photos[0]}
          onEndCall={handleEndVideoCall}
        />
      ) : (
        <>
          {/* Mobile header */}
          <header className="bg-white border-b md:hidden">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Video className="h-6 w-6 text-primary-600" />
                <h1 className="ml-2 text-xl font-bold">Blurry</h1>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </header>
          
          {/* Main content */}
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row min-h-[calc(100vh-60px)] md:min-h-screen">
            {/* Sidebar - Desktop only */}
            <div className="hidden md:block w-20 bg-white rounded-l-xl shadow-sm">
              <div className="h-full flex flex-col items-center justify-between py-8">
                <div>
                  <div className="mb-8 flex justify-center">
                    <Video className="h-8 w-8 text-primary-600" />
                  </div>
                  
                  <nav className="space-y-6">
                    <button
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                        activeTab === 'discover' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('discover')}
                    >
                      <Heart size={24} />
                      <span className="text-xs mt-1">Discover</span>
                    </button>
                    
                    <button
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                        activeTab === 'messages' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('messages')}
                    >
                      <MessageCircle size={24} />
                      <span className="text-xs mt-1">Messages</span>
                    </button>
                    
                    <button
                      className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
                        activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User size={24} />
                      <span className="text-xs mt-1">Profile</span>
                    </button>
                  </nav>
                </div>
                
                <div className="space-y-6">
                  <button
                    className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings size={24} />
                    <span className="text-xs mt-1">Settings</span>
                  </button>
                  
                  <button
                    className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut size={24} />
                    <span className="text-xs mt-1">Logout</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile navigation */}
            <div className="md:hidden flex justify-around bg-white shadow-sm rounded-xl mb-4 p-1">
              <button
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-lg ${
                  activeTab === 'discover' ? 'bg-primary-50 text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('discover')}
              >
                <Heart size={20} />
                <span className="text-xs mt-1">Discover</span>
              </button>
              
              <button
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-lg ${
                  activeTab === 'messages' ? 'bg-primary-50 text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <MessageCircle size={20} />
                <span className="text-xs mt-1">Messages</span>
              </button>
              
              <button
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-lg ${
                  activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={20} />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 bg-white md:rounded-r-xl shadow-sm overflow-hidden">
              {activeTab === 'discover' && (
                <div className="h-full flex flex-col p-4">
                  <h2 className="text-2xl font-bold mb-6">Discover</h2>
                  
                  {potentialMatches.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="bg-gray-100 p-6 rounded-full mb-4">
                        <Heart size={40} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No more profiles to show</h3>
                      <p className="text-gray-600 max-w-md">
                        We're searching for more people that match your preferences. Check back soon!
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <MatchCard
                        user={potentialMatches[0]}
                        onLike={() => handleLikeUser(potentialMatches[0].id)}
                        onPass={() => handlePassUser(potentialMatches[0].id)}
                        compatibility={Math.floor(Math.random() * 20) + 75} // 75-95% compatibility
                      />
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'messages' && (
                <div className="h-full flex flex-col md:flex-row">
                  {/* Conversations list */}
                  <div className={`w-full md:w-80 md:border-r ${selectedChat ? 'hidden md:block' : ''}`}>
                    <ConversationList
                      conversations={matchedUsers}
                      messages={messages}
                      activeConversation={activeChat}
                      onSelectConversation={handleSelectChat}
                      currentUserId={user.id}
                    />
                  </div>
                  
                  {/* Chat interface */}
                  {selectedChat ? (
                    <div className="flex-1">
                      <ChatInterface
                        currentUser={user}
                        chatPartner={matchedUsers.find(u => u.id === selectedChat)!}
                        onVideoCallClick={() => handleStartVideoCall(selectedChat)}
                      />
                    </div>
                  ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center text-center p-6">
                      <div>
                        <div className="bg-gray-100 p-6 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                          <MessageCircle size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Select a conversation</h3>
                        <p className="text-gray-600 max-w-md">
                          Choose a conversation from the list or start a new one with one of your matches.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div className="h-full p-6">
                  <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                  
                  <ProfileCard
                    user={user}
                    isEditable={true}
                    onEdit={() => navigate('/profile/edit')}
                  />
                  
                  {matches.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">My Matches</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {matchedUsers.map((matchedUser) => (
                          <div key={matchedUser.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
                            <div className="p-4 flex items-center">
                              <img
                                src={matchedUser.photos[0]}
                                alt={matchedUser.name}
                                className="h-16 w-16 rounded-full object-cover"
                                style={{ filter: 'blur(3px)' }}
                              />
                              <div className="ml-4">
                                <h4 className="font-bold">{matchedUser.name}, {matchedUser.age}</h4>
                                <p className="text-sm text-gray-600">{matchedUser.location}</p>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 flex justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<MessageCircle size={16} />}
                                onClick={() => {
                                  setActiveTab('messages');
                                  handleSelectChat(matchedUser.id);
                                }}
                              >
                                Message
                              </Button>
                              
                              <Button
                                variant="primary"
                                size="sm"
                                leftIcon={<Video size={16} />}
                                onClick={() => handleStartVideoCall(matchedUser.id)}
                              >
                                Video Call
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
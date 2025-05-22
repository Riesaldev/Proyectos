import React, { useState, useEffect } from 'react';
import { 
  Video, 
  X, 
  Mic, 
  MicOff, 
  VideoOff, 
  Send, 
  Gift, 
  GamepadIcon, 
  Clock,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useVideoCallStore } from '../../store/videoCallStore';

interface VideoCallPanelProps {
  partnerId: string;
  partnerName: string;
  partnerPhoto?: string;
  onEndCall: () => void;
}

const VideoCallPanel: React.FC<VideoCallPanelProps> = ({
  partnerId,
  partnerName,
  partnerPhoto,
  onEndCall,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [canUnblur, setCanUnblur] = useState(false);
  const [showUnblurRequest, setShowUnblurRequest] = useState(false);
  const [unblurRequestSent, setUnblurRequestSent] = useState(false);
  const [unblurRequestReceived, setUnblurRequestReceived] = useState(false);
  
  const { 
    blurLevel,
    updateNotes, 
    notes, 
    endCall,
    callDuration,
    sendUnblurRequest,
    acceptUnblurRequest,
    rejectUnblurRequest
  } = useVideoCallStore();
  
  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Check if call duration meets minimum requirement for unblur (e.g., 30 minutes)
  useEffect(() => {
    if (callDuration >= 30 * 60) { // 30 minutes in seconds
      setCanUnblur(true);
    }
  }, [callDuration]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleEndCall = async () => {
    await endCall();
    onEndCall();
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNotes(e.target.value);
  };
  
  const handleSendUnblurRequest = async () => {
    await sendUnblurRequest(partnerId);
    setUnblurRequestSent(true);
    setShowUnblurRequest(false);
  };
  
  const handleAcceptUnblurRequest = async () => {
    await acceptUnblurRequest(partnerId);
    setUnblurRequestReceived(false);
    setCanUnblur(true);
  };
  
  const handleRejectUnblurRequest = async () => {
    await rejectUnblurRequest(partnerId);
    setUnblurRequestReceived(false);
  };
  
  // Mock game options
  const games = [
    { id: 'g1', name: 'Two Truths & A Lie', isPremium: false },
    { id: 'g2', name: 'Quick Questions', isPremium: false },
    { id: 'g3', name: 'Would You Rather', isPremium: false },
    { id: 'g4', name: 'Compatibility Quiz', isPremium: true },
  ];
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Call timer and controls */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between items-center px-4">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center">
          <Clock size={18} className="mr-2" />
          {formatTime(timeLeft)}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-black/60 text-white border-white/20"
          onClick={() => setTimeLeft(timeLeft + 60)}
        >
          +1 min
        </Button>
      </div>
      
      {/* Main video container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {/* Partner video */}
        <div className="relative rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
          {partnerPhoto ? (
            <img 
              src={partnerPhoto} 
              alt={`${partnerName} video`} 
              className="w-full h-full object-cover"
              style={{ filter: `blur(${8}px)` }} // Fixed blur level
            />
          ) : (
            <div className="text-white text-xl">
              {partnerName}'s video is loading...
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            {partnerName}
          </div>
          
          {!canUnblur && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center text-white">
                <Lock size={48} className="mx-auto mb-2" />
                <p className="text-lg font-medium">Blur is locked</p>
                <p className="text-sm opacity-75">
                  Continue talking to unlock blur options
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Your video */}
        <div className="relative rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
          {isVideoOff ? (
            <div className="flex flex-col items-center justify-center text-white">
              <VideoOff size={48} className="mb-2" />
              <p>Your camera is off</p>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <Video size={48} className="text-gray-500" />
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            You
          </div>
        </div>
      </div>
      
      {/* Unblur request notifications */}
      {unblurRequestReceived && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-80">
          <h3 className="text-lg font-bold mb-2">Unblur Request</h3>
          <p className="text-gray-600 mb-4">
            {partnerName} would like to remove the blur. Do you agree?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectUnblurRequest}
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAcceptUnblurRequest}
            >
              Accept
            </Button>
          </div>
        </div>
      )}
      
      {/* Call controls */}
      <div className="p-4 bg-gray-900 flex flex-wrap justify-center gap-4">
        <Button
          variant={isMuted ? 'primary' : 'outline'}
          className={`rounded-full h-12 w-12 !p-0 ${!isMuted && 'text-white border-white/30'}`}
          onClick={handleToggleMute}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        
        <Button
          variant={isVideoOff ? 'primary' : 'outline'}
          className={`rounded-full h-12 w-12 !p-0 ${!isVideoOff && 'text-white border-white/30'}`}
          onClick={handleToggleVideo}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </Button>
        
        {canUnblur && !unblurRequestSent && (
          <Button
            variant="primary"
            className="rounded-full h-12 px-4"
            onClick={() => setShowUnblurRequest(true)}
          >
            Request Unblur
          </Button>
        )}
        
        <Button
          variant="outline"
          className={`rounded-full h-12 w-12 !p-0 ${!showGames ? 'text-white border-white/30' : 'bg-primary-500 border-primary-500 text-white'}`}
          onClick={() => {
            setShowGames(!showGames);
            setShowNotes(false);
          }}
        >
          <GamepadIcon size={20} />
        </Button>
        
        <Button
          variant="outline"
          className={`rounded-full h-12 w-12 !p-0 ${!showNotes ? 'text-white border-white/30' : 'bg-primary-500 border-primary-500 text-white'}`}
          onClick={() => {
            setShowNotes(!showNotes);
            setShowGames(false);
          }}
        >
          <Send size={20} />
        </Button>
        
        <Button
          variant="outline"
          className="rounded-full h-12 w-12 !p-0 text-white border-white/30"
        >
          <Gift size={20} />
        </Button>
        
        <Button
          variant="error"
          className="rounded-full h-12 w-12 !p-0"
          onClick={handleEndCall}
        >
          <X size={20} />
        </Button>
      </div>
      
      {/* Unblur request confirmation */}
      {showUnblurRequest && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Request to Remove Blur</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to request removing the blur? This will only happen if {partnerName} also agrees.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowUnblurRequest(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSendUnblurRequest}
              >
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Games panel */}
      {showGames && (
        <motion.div 
          className="absolute bottom-24 left-4 right-4 bg-white rounded-xl shadow-lg p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-bold mb-3">Games</h3>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game) => (
              <div
                key={game.id}
                className={`p-3 border rounded-lg flex items-center ${game.isPremium ? 'border-secondary-200 bg-secondary-50' : 'border-gray-200'}`}
              >
                <GamepadIcon size={20} className={game.isPremium ? 'text-secondary-500' : 'text-gray-500'} />
                <span className="ml-2 flex-1">{game.name}</span>
                {game.isPremium && (
                  <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-0.5 rounded">
                    Premium
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Notes panel */}
      {showNotes && (
        <motion.div 
          className="absolute bottom-24 left-4 right-4 bg-white rounded-xl shadow-lg p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-bold mb-3">Notes</h3>
          <p className="text-sm text-gray-600 mb-2">
            Write down your thoughts about this call. Only you can see these notes.
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={4}
            placeholder="What did you learn about them? What do you want to remember?"
            value={notes}
            onChange={handleNotesChange}
          />
        </motion.div>
      )}
    </div>
  );
};

export default VideoCallPanel;
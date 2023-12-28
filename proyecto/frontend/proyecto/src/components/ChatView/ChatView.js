import React, { useState } from 'react';
import FriendsList from './FriendList/FriendList';
import MessageList from './MessageList/MessageList';

const ChatView = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div>
      <FriendsList onFriendSelect={handleFriendSelect} />
      <MessageList selectedFriend={selectedFriend} />
    </div>
  );
};

export default ChatView;

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socketUrl = process.env.BASE_URL;
    
    // Initialize socket
    const socketInstance = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Set socket instance
    setSocket(socketInstance);

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Connected to socket");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket");
      setIsConnected(false);
    });

    // Notification event handler
    socketInstance.on('notification', (data) => {
      setUnreadCount((prev) => prev + 1);
      setNotifications((prev) => [...prev, data]);
    });

    // Message event handler
    socketInstance.on('new_message', (data) => {
      setUnreadCount((prev) => prev + 1);
      setNewMessages((prev) => [...prev, data]);
    });

    // Cleanup function
    return () => {
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('notification');
      socketInstance.off('new_message');
      socketInstance.disconnect();
    };
  }, []);

  // Reset unread count
  const resetUnreadCount = () => {
    setUnreadCount(0);
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Get notification by ID
  const getNotificationById = (id) => {
    return notifications.find(notification => notification.data.sourceUser._id === id);
  };

  // Get message by ID
  const getMessageById = (id) => {
    return newMessages.find(message => message.data.target === id);
  };

  const value = {
    socket,
    isConnected,
    notifications,
    newMessages,
    unreadCount,
    resetUnreadCount,
    clearNotifications,
    getNotificationById,
    getMessageById
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}; 
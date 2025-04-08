// This file is maintained for backwards compatibility
// Import from the context instead
import { useSocket } from './socketContext';

// For components that directly import the socket instance,
// we'll provide a way to get it from the context
let socket = null;

// This is a placeholder that will be replaced with the actual socket when context is initialized
// Components should migrate to using the useSocket hook instead of direct imports
if (typeof window !== 'undefined') {
  // Only attempt to create this on the client side
  try {
    // Create a dummy socket that warns about deprecated usage
    socket = new Proxy({}, {
      get: function(target, prop) {
        console.warn('Direct socket import is deprecated. Use useSocket() hook instead.');
        // Return a function that logs a warning
        if (typeof prop === 'string' && ['on', 'emit', 'off'].includes(prop)) {
          return function(...args) {
            console.warn(`socket.${prop} called directly. Update to use useSocket() hook.`);
            // We can't actually do anything here since we don't have the real socket
            return null;
          };
        }
        return undefined;
      }
    });
  } catch (e) {
    console.error('Failed to create socket proxy:', e);
  }
}

export { useSocket };
export default socket; 
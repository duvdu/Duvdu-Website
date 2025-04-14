/**
 * Utility functions for Apple Sign In
 */

/**
 * Initializes the Apple Sign In functionality
 * @param {string} clientId - The Apple Client ID
 * @param {string} redirectUri - The redirect URI after authentication
 */
export const initAppleSignIn = (clientId, redirectUri) => {
  if (typeof window !== 'undefined' && window.AppleID) {
    window.AppleID.auth.init({
      clientId: clientId,
      scope: 'name email',
      redirectURI: redirectUri,
      usePopup: true
    });
  }
};

/**
 * Performs the Apple Sign In flow
 * @returns {Promise} A promise that resolves with the authentication data
 */
export const performAppleSignIn = () => {
  if (typeof window === 'undefined' || !window.AppleID) {
    return Promise.reject(new Error('Apple Sign In is not available'));
  }

  return window.AppleID.auth.signIn().then(response => {
    console.log({response})
    // Convert response to a consistent format
    return {
      user: response.user || response.authorization?.id_token || '',
      email: response.email || '',
      name: response.name || {
        firstName: '',
        lastName: ''
      }
    };
  });
};

/**
 * Process Apple Sign In data
 * @param {Object} data - The data from Apple Sign In
 * @returns {Object} Processed user data
 */
export const processAppleUserData = (data) => {
  const { user, email, name } = data;
  console.log({data});
  // Get name components or use defaults
  const firstName = name?.firstName || '';
  const lastName = name?.lastName || '';
  
  // Create a full name or use a default
  const fullName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : (firstName || lastName || 'Apple User');
  
  // Create a username from email or user ID
  const username = email 
    ? email.split('@')[0] 
    : `apple_${user.substring(0, 8)}`;
  
  return {
    id: user,
    email: email || '',
    name: fullName,
    username: username
  };
}; 
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
 * Decode a JWT token to get the payload
 * @param {string} token - The JWT token to decode
 * @returns {Object} The decoded payload
 */
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return {};
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
    
    // The response contains authorization object with id_token
    const idToken = response.authorization?.id_token;
    let userData = {};
    
    if (idToken) {
      // Decode the JWT token to get user information
      const decodedToken = decodeJWT(idToken);
      
      userData = {
        // 'sub' contains the unique user identifier
        user: decodedToken.sub || '',
        email: decodedToken.email || '',
        // Apple doesn't provide name in the token after first login
        name: {
          firstName: '',
          lastName: ''
        }
      };
    }
    
    return userData;
  });
};

/**
 * Process Apple Sign In data
 * @param {Object} data - The data from Apple Sign In
 * @returns {Object} Processed user data
 */
export const processAppleUserData = (data) => {
  const { user, email, name } = data;
  
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
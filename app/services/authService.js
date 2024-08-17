// authService.js
const users = [
    { email: 'user@example.com', websiteUrl: 'http://openlock.io' },
    // Add more users as needed
  ];
  
  exports.validateUser = async (email, websiteUrl) => {
    return users.find(user => user.email === email && user.websiteUrl === websiteUrl);
  };
  
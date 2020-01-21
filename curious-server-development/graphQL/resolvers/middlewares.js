const { AuthenticationError } = require('apollo-server');

exports.authMiddleware = (resolver) => async (obj, args, context, info) => {
  console.log('authmiddleware: ', context);
  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');
  return resolver(obj, args, context, info);
};

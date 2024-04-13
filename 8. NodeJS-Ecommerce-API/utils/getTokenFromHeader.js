export const getTokenFromHeader = (req) => {
    // get token from  headers POSTMAN/Get Headers/Key=Authorization/Value=Bearer jsonwebtoken
    const token = req?.headers?.authorization?.split(' ')[1];
    if(!token) return 'No token Found in the Header';
    return token;
};
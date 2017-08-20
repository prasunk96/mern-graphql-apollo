export const authHeaderMiddleware = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = window.localStorage.getItem('token');
    req.options.headers.authorization = token ? `${token}` : null;
    next();
  }
}
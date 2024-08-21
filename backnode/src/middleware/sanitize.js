import sanitizeHtml from 'sanitize-html'

function sanitizeHtmlInput(req, res, next) {
    if (req.body && typeof req.body === 'object') {
      try {
        // Helper function to sanitize a value
        // console.log(req.body,'this value is not sanitized')
        const sanitizeValue = (value) => {
          if (typeof value === 'string') {
            return sanitizeHtml(value, {
              allowedTags: [], // No HTML tags allowed
              allowedAttributes: {} // No attributes allowed
            });
          }
          return value; // Return the value as is if it's not a string
        };
  
        // Sanitize all values in the request body
        for (let key in req.body) {
          if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            req.body[key] = sanitizeValue(req.body[key]);
          }
        }
        
        next();
      } catch (err) {
        // Handle any errors that occur during sanitization
        console.error('Sanitization error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      // Proceed to the next middleware if req.body is not an object
      next();
    }
  }



  export default sanitizeHtmlInput;
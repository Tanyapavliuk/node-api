const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  409: "Conflict",
};

// функція прокидання помилки для блоку try
function errorHandler(status, message = messages[status]) {
  const error = new Error(message); //створення нової помилки
  error.status = status;
  throw error;
}

module.exports = errorHandler;

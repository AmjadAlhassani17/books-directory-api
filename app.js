const express = require("express");
require("dotenv").config();
const { logger } = require("./middleware/logger")
const { notFound, errorHandler } = require("./middleware/errors");

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/books' , require("./routes/books"));
app.use('/api/auth' , require("./routes/auth"));
app.use('/api/user' , require("./routes/user"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server is running in ${process.env.NODE_ENV} mode in port ${process.env.PORT}`));
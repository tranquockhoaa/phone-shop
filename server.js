const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

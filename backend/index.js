const express = require('express')

const app = express()
const port = process.env.PORT ?? 8080

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

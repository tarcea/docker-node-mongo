const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'hello gogo 333' });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

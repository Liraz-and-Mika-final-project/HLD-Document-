const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));
// average milk status 
/*
app.get('/api/milk-status', (req, res) => {
  res.json({
    weight: 1220,
    percentageFull: 67,
    isExpired: false,
    timestamp: new Date().toISOString()
  });
});
*/

// milk empty and expired 
app.get('/api/milk-status', (req, res) => {
res.json({
  weight: 250,
  percentageFull: 10,
  isExpired: true,
  timestamp: new Date().toISOString()
  });
});

// milk is fresh and full  
/*
res.json({
  weight: 1900,
  percentageFull: 95,
  isExpired: false,
  timestamp: new Date().toISOString()
});
*/




const fs = require('fs');

// Serve React app for all remaining routes
app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'client', 'build', 'index.html');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send('Page not found');
    res.sendFile(filePath);
  });
});

app.listen(PORT, () => {
  console.log(`Smart Milk backend running at http://localhost:${PORT}`);
});

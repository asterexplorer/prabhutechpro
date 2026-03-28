const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
let stats = {
  activeUsers: 250420,
  uptimeSla: 99.98,
  automationsRun: 5234120,
  capRaised: 12.5
};

// Update stats periodically to simulate dynamic backend
setInterval(() => {
  stats.activeUsers += Math.floor(Math.random() * 10);
  stats.automationsRun += Math.floor(Math.random() * 50);
}, 3000);

// Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.post('/api/contact', (req, res) => {
  const { email, name, message } = req.body;
  console.log(`[Backend] New contact request received from: ${email}`);
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const submission = {
    id: `PBX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    email,
    name: name || 'Anonymous',
    message: message || 'Newsletter Signup',
    date: new Date()
  };

  try {
    const filePath = path.join(__dirname, 'submissions.json');
    let submissions = [];
    if (fs.existsSync(filePath)) {
      submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    submissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    
    // Simulate success
    res.status(200).json({ 
      message: 'Success! Your request has been received by Prabhu Tech Pro enterprise servers.',
      submissionId: submission.id
    });
  } catch (err) {
    console.error('[Backend Error] Failed to save submission:', err);
    res.status(500).json({ error: 'Internal server error while saving submission' });
  }
});

app.listen(PORT, () => {
  console.log(`[Server] Prabhu Tech Pro Backend running on http://localhost:${PORT}`);
});

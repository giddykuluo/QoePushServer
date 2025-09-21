const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let subscriptions = [];

// VAPID keys must be set as environment variables on Render or locally as shown below
const VAPID_PUBLIC = process.env.VAPID_PUBLIC || '<PUT_PUBLIC_KEY_HERE>';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE || '<PUT_PRIVATE_KEY_HERE>';

webpush.setVapidDetails('mailto:you@example.com', VAPID_PUBLIC, VAPID_PRIVATE);

// receive subscription from client
app.post('/subscribe', (req, res) => {
  const sub = req.body;
  subscriptions.push(sub);
  res.status(201).json({ ok: true });
});

// send message to all subscribers
app.post('/send', async (req, res) => {
  const payload = JSON.stringify(req.body || { title: 'QoE', body: 'Test' });
  try {
    await Promise.all(subscriptions.map(s => webpush.sendNotification(s, payload)));
    res.json({ ok: true, sent: subscriptions.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
});

// optional health check
app.get('/', (req, res) => res.json({ ok: true }));

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => console.log(`Push server running on http://localhost:${PORT}`));

# QoePushServer

Node.js push server for QoE app. Receives browser push subscription objects (`/subscribe`) and sends push notifications to all subscribers (`/send`).

## Local testing
1. Install: `npm install`
2. Start: `node server.js`
3. Generate VAPID keys: `npx web-push generate-vapid-keys --json`
4. Set env vars `VAPID_PUBLIC` and `VAPID_PRIVATE` (or paste keys into `server.js` for quick testing)
5. Test send: `curl -X POST "http://localhost:3000/send" -H "Content-Type: application/json" -d "{\"title\":\"Test\",\"body\":\"Hello\"}"`

## Deploy
Push this repository to GitHub and create a Render Web Service (Node). Build command: `npm install`. Start command: `npm start`. Port: `3000`. Add VAPID keys as environment variables on Render.

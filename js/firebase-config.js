/**
 * VOLUNTEER//HUB — Firebase Configuration
 *
 * DEMO MODE: When firebaseConfig values are placeholders, the app runs
 * entirely on mock data from data.js. Set DEMO_MODE = false and fill in
 * your real Firebase project config to enable live data.
 *
 * Setup instructions:
 *   1. Create a Firebase project at console.firebase.google.com
 *   2. Enable Google Sign-In in Authentication → Sign-in method
 *   3. Create a Firestore database
 *   4. Register a web app and paste the config below
 *   5. Add your domain (e.g. lobsterbush.github.io) to Authorized domains
 */

export const DEMO_MODE = true; // Set to false when Firebase is configured

const firebaseConfig = {
  apiKey:            'YOUR_API_KEY',
  authDomain:        'YOUR_PROJECT.firebaseapp.com',
  projectId:         'YOUR_PROJECT_ID',
  storageBucket:     'YOUR_PROJECT.appspot.com',
  messagingSenderId: '000000000000',
  appId:             '1:000000000000:web:0000000000000000',
};

let app = null;
let auth = null;
let db = null;

if (!DEMO_MODE) {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js');
    const { getAuth }       = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js');
    const { getFirestore }  = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js');

    app  = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db   = getFirestore(app);

    console.log('[Firebase] Initialised — live mode');
  } catch (err) {
    console.warn('[Firebase] Init failed, falling back to demo mode:', err);
  }
} else {
  console.log('[Firebase] Running in DEMO MODE — no live data');
}

export { app, auth, db };

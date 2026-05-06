/**
 * VOLUNTEER HUB — Configuration
 * Firebase + Gemini API keys. Demo mode by default.
 */
export const DEMO_MODE = false;
export const GEMINI_API_KEY = ''; // Paste your Gemini API key here for LLM-powered reflections

const firebaseConfig = {
  apiKey: 'AIzaSyB7g4TBZ6XJeAWlImxpBoXkMBDOOPCHQSE',
  authDomain: 'monash-volunteering.firebaseapp.com',
  projectId: 'monash-volunteering',
  storageBucket: 'monash-volunteering.firebasestorage.app',
  messagingSenderId: '518069607082',
  appId: '1:518069607082:web:f6d374beba246f3ff54ed3',
  measurementId: 'G-CFJQR8S4B2',
};

let app = null, auth = null, db = null;
if (!DEMO_MODE) {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js');
    const { getAuth }       = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js');
    const { getFirestore }  = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js');
    app = initializeApp(firebaseConfig); auth = getAuth(app); db = getFirestore(app);
  } catch (e) { console.warn('[Firebase] Init failed:', e); }
}
export { app, auth, db };

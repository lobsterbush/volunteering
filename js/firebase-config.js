/**
 * VOLUNTEER HUB — Configuration
 * Firebase + Gemini API keys. Demo mode by default.
 */
export const DEMO_MODE = false;
export const GEMINI_API_KEY = 'AIzaSyCJL_ThAS8QAJvSBH1pG0Uf9kqsCFYSjpE';

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
let firebaseAuth = null; // holds the full firebase/auth module

if (!DEMO_MODE) {
  try {
    const appMod  = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js');
    firebaseAuth  = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js');
    const dbMod   = await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js');
    app  = appMod.initializeApp(firebaseConfig);
    auth = firebaseAuth.getAuth(app);
    db   = dbMod.getFirestore(app);
    console.log('[Firebase] Ready');
  } catch (e) { console.error('[Firebase] Init failed:', e); }
}
export { app, auth, db, firebaseAuth };

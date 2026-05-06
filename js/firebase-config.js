/**
 * VOLUNTEER HUB — Configuration
 * Firebase + Gemini API keys. Demo mode by default.
 */
export const DEMO_MODE = true;
export const GEMINI_API_KEY = ''; // Paste your Gemini API key here for LLM-powered reflections

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID', storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: '000000000000', appId: '1:000000000000:web:0000000000000000',
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

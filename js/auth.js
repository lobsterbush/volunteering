import { auth, DEMO_MODE, firebaseAuth } from './firebase-config.js';
import { showToast } from './app.js';

const demoUser = { uid: 'demo-vol-037', displayName: 'Jordan Lee', email: 'jlee0042@student.monash.edu', photoURL: null };
let currentUser = null;

export function getUser() { return currentUser; }
export function isSignedIn() { return currentUser !== null; }

export async function initAuth() {
  const overlay = document.getElementById('authOverlay');
  const authBar = document.getElementById('authBar');
  const profile = document.getElementById('userProfile');

  function applySignedIn(user) {
    currentUser = user;
    document.body.classList.add('signed-in');
    if (overlay) { overlay.classList.add('exiting'); setTimeout(() => overlay.hidden = true, 350); }
    if (authBar) authBar.hidden = true;
    if (profile) {
      profile.hidden = false;
      const av = profile.querySelector('.user-avatar');
      const nm = profile.querySelector('.user-name');
      if (av) av.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=DC4A2D&color=fff&bold=true&size=56`;
      if (nm) nm.textContent = user.displayName;
    }
    showToast(`Signed in as ${user.displayName}`, 'success');
  }

  function applySignedOut() {
    currentUser = null;
    document.body.classList.remove('signed-in');
    if (overlay) { overlay.hidden = false; overlay.classList.remove('exiting'); }
    if (authBar) authBar.hidden = false;
    if (profile) profile.hidden = true;
  }

  document.getElementById('authSkip')?.addEventListener('click', () => {
    if (overlay) { overlay.classList.add('exiting'); setTimeout(() => overlay.hidden = true, 350); }
  });

  if (DEMO_MODE) {
    document.getElementById('btnGoogle')?.addEventListener('click', () => applySignedIn(demoUser));
    document.getElementById('barSignin')?.addEventListener('click', () => applySignedIn(demoUser));
    document.getElementById('btnSignout')?.addEventListener('click', applySignedOut);
    return;
  }

  if (!firebaseAuth || !auth) {
    console.error('[Auth] Firebase not initialized — auth:', auth, 'module:', firebaseAuth);
    // Fall back to demo so the button isn't dead
    document.getElementById('btnGoogle')?.addEventListener('click', () => applySignedIn(demoUser));
    document.getElementById('barSignin')?.addEventListener('click', () => applySignedIn(demoUser));
    document.getElementById('btnSignout')?.addEventListener('click', applySignedOut);
    return;
  }

  try {
    const { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } = firebaseAuth;
    const provider = new GoogleAuthProvider();
    // Don't set hd — it only allows one domain and would exclude
    // @student.monash.edu accounts. The post-sign-in check below
    // enforces both @monash.edu and @student.monash.edu.

    const doSignIn = async () => {
      console.log('[Auth] Sign-in clicked, opening popup...');
      try {
        const result = await signInWithPopup(auth, provider);
        const email = result.user.email || '';
        if (!email.endsWith('@student.monash.edu') && !email.endsWith('@monash.edu')) {
          await signOut(auth); showToast('Use a Monash Google account'); return;
        }
      } catch (e) {
        console.error('[Auth] Sign-in error:', e);
        if (e.code !== 'auth/popup-closed-by-user') showToast('Sign-in failed — ' + (e.message || ''));
      }
    };
    document.getElementById('btnGoogle')?.addEventListener('click', doSignIn);
    document.getElementById('barSignin')?.addEventListener('click', doSignIn);
    document.getElementById('btnSignout')?.addEventListener('click', () => signOut(auth));
    onAuthStateChanged(auth, u => u ? applySignedIn({ uid: u.uid, displayName: u.displayName || 'Volunteer', email: u.email, photoURL: u.photoURL }) : applySignedOut());
    console.log('[Auth] Listeners attached');
  } catch (e) { console.error('[Auth] Setup failed:', e); }
}

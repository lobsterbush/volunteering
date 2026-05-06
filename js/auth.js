/**
 * VOLUNTEER//HUB — Authentication
 * Google Sign-In with Monash domain restriction.
 * In demo mode, simulates a signed-in volunteer.
 */

import { auth, DEMO_MODE } from './firebase-config.js';
import { showToast } from './app.js';

/* ── Demo user ── */
const demoUser = {
  uid: 'demo-vol-037',
  displayName: 'Jordan Lee',
  email: 'jlee0042@student.monash.edu',
  photoURL: null,
};

let currentUser = null;

/* ── Public API ── */
export function getUser() { return currentUser; }
export function isSignedIn() { return currentUser !== null; }

/* ── Initialise auth state ── */
export async function initAuth() {
  const overlay   = document.getElementById('authOverlay');
  const authBar   = document.getElementById('authBar');
  const profile   = document.getElementById('userProfile');
  const skipBtn   = document.getElementById('authSkip');
  const googleBtn = document.getElementById('btnGoogle');
  const barSignin = document.getElementById('barSignin');
  const signoutBtn = document.getElementById('btnSignout');

  function applySignedIn(user) {
    currentUser = user;
    document.body.classList.add('signed-in');
    if (overlay) { overlay.classList.add('exiting'); setTimeout(() => overlay.hidden = true, 400); }
    if (authBar) authBar.hidden = true;

    /* Render profile */
    if (profile) {
      profile.hidden = false;
      const avatar = profile.querySelector('.user-avatar');
      const name   = profile.querySelector('.user-name');
      if (avatar) avatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=FF4438&color=141414&bold=true&size=64`;
      if (name) name.textContent = user.displayName;
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

  /* ── Skip button (browse as guest) ── */
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      if (overlay) { overlay.classList.add('exiting'); setTimeout(() => overlay.hidden = true, 400); }
    });
  }

  /* ── Demo mode: sign in instantly ── */
  if (DEMO_MODE) {
    if (googleBtn) {
      googleBtn.addEventListener('click', () => applySignedIn(demoUser));
    }
    if (barSignin) {
      barSignin.addEventListener('click', () => applySignedIn(demoUser));
    }
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => applySignedOut());
    }
    return;
  }

  /* ── Live Firebase auth ── */
  try {
    const { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } =
      await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js');

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: 'monash.edu' }); // Hint: Monash domain

    async function doSignIn() {
      try {
        const result = await signInWithPopup(auth, provider);
        const email = result.user.email || '';
        if (!email.endsWith('@student.monash.edu') && !email.endsWith('@monash.edu')) {
          await signOut(auth);
          showToast('Please sign in with a Monash Google account', 'error');
          return;
        }
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          console.error('[Auth]', err);
          showToast('Sign-in failed — try again', 'error');
        }
      }
    }

    if (googleBtn)  googleBtn.addEventListener('click', doSignIn);
    if (barSignin)  barSignin.addEventListener('click', doSignIn);
    if (signoutBtn) signoutBtn.addEventListener('click', () => signOut(auth));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        applySignedIn({
          uid: user.uid,
          displayName: user.displayName || 'Volunteer',
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        applySignedOut();
      }
    });
  } catch (err) {
    console.warn('[Auth] Firebase auth module failed to load:', err);
  }
}

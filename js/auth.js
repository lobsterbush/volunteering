import { auth, DEMO_MODE } from './firebase-config.js';
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

  try {
    const { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } =
      await import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: 'monash.edu' });

    const doSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const email = result.user.email || '';
        if (!email.endsWith('@student.monash.edu') && !email.endsWith('@monash.edu')) {
          await signOut(auth); showToast('Use a Monash Google account'); return;
        }
      } catch (e) { if (e.code !== 'auth/popup-closed-by-user') showToast('Sign-in failed'); }
    };
    document.getElementById('btnGoogle')?.addEventListener('click', doSignIn);
    document.getElementById('barSignin')?.addEventListener('click', doSignIn);
    document.getElementById('btnSignout')?.addEventListener('click', () => signOut(auth));
    onAuthStateChanged(auth, u => u ? applySignedIn({ uid: u.uid, displayName: u.displayName || 'Volunteer', email: u.email, photoURL: u.photoURL }) : applySignedOut());
  } catch (e) { console.warn('[Auth]', e); }
}

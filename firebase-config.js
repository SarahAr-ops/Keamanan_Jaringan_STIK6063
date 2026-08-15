/**
 * Firebase Configuration for Quiz Auto-Grader & Rekap Nilai
 * STIK6063 - Keamanan Jaringan
 */

(function () {
  // Default configuration (bisa disesuaikan atau diinput via UI Settings)
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyC0JX_x0EKCLVXY4mIyMTQ67xXVjNoxj6k",
    authDomain: "quiz-keamanan-jaringan-2026.firebaseapp.com",
    projectId: "quiz-keamanan-jaringan-2026",
    storageBucket: "quiz-keamanan-jaringan-2026.firebasestorage.app",
    messagingSenderId: "550760955677",
    appId: "1:550760955677:web:a0b5fb701a782b6554ebf4"
  };

  const STORAGE_KEY = 'cbl_firebase_custom_config';

  window.getFirebaseConfig = function () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.projectId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Gagal membaca konfigurasi Firebase dari localStorage:", e);
    }
    return DEFAULT_FIREBASE_CONFIG;
  };

  window.saveFirebaseConfig = function (configObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configObj));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan konfigurasi Firebase ke localStorage:", e);
      return false;
    }
  };

  window.initFirebaseApp = function () {
    const cfg = window.getFirebaseConfig();
    if (cfg && cfg.apiKey && cfg.projectId && window.firebase) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(cfg);
        }
        return firebase.firestore();
      } catch (err) {
        console.error("Inisialisasi Firebase error:", err);
        return null;
      }
    }
    return null;
  };
})();

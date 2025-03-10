import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
};

export const app = initializeApp(firebaseConfig);
// export const analytics = isSupported()
//   .then((_) => getAnalytics(app))
//   .catch((e: any) =>
//     console.warn("Analytics is not supported in this environment.", e.message)
//   );
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const ADMIN_COLLECTION = "admin";
export const BUSINESS_COLLECTION = "business";
export const BUSINESS_MEDIA_COLLECTION = "media";
export const CATEGORIES_COLLECTION = "categories";
export const LOCATIONS_COLLECTION = "locations";
export const METRICS_COLLECTION = "metrics";
export const METRICS_DOCUMENT_ID = "impact-numbers";

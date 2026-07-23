import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import { db, storage, auth, handleFirestoreError, OperationType } from './firebase';

export interface AppConfig {
  companyName: string;
  logoUrl: string;
  updatedAt: string;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  companyName: 'Nemean Partners',
  logoUrl: '/nemean_logo.svg',
  updatedAt: new Date().toISOString(),
};

/**
 * Recursively searches Firebase Storage `chatImages` folder to find uploaded logo images
 */
export async function findStorageLogoUrl(): Promise<string | null> {
  try {
    // Authenticate client anonymously if not already signed in, to satisfy Storage bucket rules
    if (!auth.currentUser) {
      console.log('No active auth session found. Attempting anonymous sign-in...');
      await signInAnonymously(auth).catch((err) => {
        console.warn('Anonymous sign-in was not enabled or failed:', err);
      });
    }

    const chatImagesRef = ref(storage, 'chatImages');
    console.log('Beginning Firebase Storage scan in folder: chatImages');
    
    async function traverseFolder(folderRef: any, prioritisedOnly: boolean): Promise<string | null> {
      try {
        console.log(`Scanning storage path: ${folderRef.fullPath} (priorityMode: ${prioritisedOnly})`);
        const res = await listAll(folderRef);
        
        // First check items in current folder
        for (const itemRef of res.items) {
          const nameLower = itemRef.name.toLowerCase();
          console.log(`Found storage file: ${itemRef.fullPath}`);
          
          if (prioritisedOnly) {
            if (nameLower.includes('chatgpt')) {
              console.log(`🎯 Found matching ChatGPT logo file: ${itemRef.fullPath}`);
              const downloadUrl = await getDownloadURL(itemRef);
              return downloadUrl;
            }
          } else {
            if (nameLower.includes('nemean') || nameLower.includes('logo') || nameLower.endsWith('.png') || nameLower.endsWith('.jpg') || nameLower.endsWith('.jpeg')) {
              console.log(`🎯 Found matching fallback logo file: ${itemRef.fullPath}`);
              const downloadUrl = await getDownloadURL(itemRef);
              return downloadUrl;
            }
          }
        }
        
        // Then search subfolders
        for (const subRef of res.prefixes) {
          const found = await traverseFolder(subRef, prioritisedOnly);
          if (found) return found;
        }
      } catch (e) {
        console.warn(`Error scanning directory ${folderRef.fullPath}:`, e);
      }
      return null;
    }

    // Pass 1: Try to find a ChatGPT image specifically
    let storageUrl = await traverseFolder(chatImagesRef, true);
    
    // Pass 2: Fallback to other images if no ChatGPT image is found
    if (!storageUrl) {
      console.log('No ChatGPT image found in first pass. Running fallback pass...');
      storageUrl = await traverseFolder(chatImagesRef, false);
    }

    if (storageUrl) {
      console.log('Successfully found Storage logo URL:', storageUrl);
      // Save/cache found logo URL to Firestore config/app
      const configDocRef = doc(db, 'config', 'app');
      await setDoc(configDocRef, { logoUrl: storageUrl, companyName: 'Nemean Partners', updatedAt: new Date().toISOString() }, { merge: true })
        .then(() => console.log('Successfully saved logo URL to Firestore config/app'))
        .catch((err) => console.warn('Could not write logo URL to Firestore:', err));
      return storageUrl;
    } else {
      console.log('No matching logo image found in Firebase Storage.');
    }
  } catch (err) {
    console.warn('Could not list Firebase Storage chatImages:', err);
  }
  return null;
}

export async function getOrInitAppConfig(): Promise<AppConfig> {
  const configDocRef = doc(db, 'config', 'app');
  try {
    const snap = await getDoc(configDocRef);
    let currentConfig: AppConfig;
    if (snap.exists()) {
      currentConfig = snap.data() as AppConfig;
    } else {
      await setDoc(configDocRef, DEFAULT_APP_CONFIG);
      currentConfig = DEFAULT_APP_CONFIG;
    }

    // Try finding live image in Firebase Storage if default or empty
    if (!currentConfig.logoUrl || currentConfig.logoUrl === '/nemean_logo.svg') {
      const storageUrl = await findStorageLogoUrl();
      if (storageUrl) {
        currentConfig.logoUrl = storageUrl;
      }
    }
    return currentConfig;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'config/app');
    return DEFAULT_APP_CONFIG;
  }
}

export function subscribeAppConfig(onUpdate: (config: AppConfig) => void) {
  const configDocRef = doc(db, 'config', 'app');
  
  // Kick off storage scan in background
  findStorageLogoUrl().catch(() => {});

  return onSnapshot(
    configDocRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as AppConfig);
      } else {
        setDoc(configDocRef, DEFAULT_APP_CONFIG).catch((err) => {
          console.warn('Initializing config document in Firestore:', err);
        });
        onUpdate(DEFAULT_APP_CONFIG);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'config/app');
    }
  );
}


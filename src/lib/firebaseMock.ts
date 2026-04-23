// Simulador de Firebase para Desenvolvimento/Fallback
// Permite que o app funcione como se estivesse online mesmo sem chaves válidas.

const MOCK_DELAY = 100;

const getLocalDB = () => JSON.parse(localStorage.getItem('lumina_mock_db') || '{}');
const saveLocalDB = (db: any) => localStorage.setItem('lumina_mock_db', JSON.stringify(db));

// --- Auth Mock ---
export const mockAuth = {
  currentUser: null as any,
  onAuthStateChanged: (auth: any, callback: (user: any) => void) => {
    const savedUser = localStorage.getItem('lumina_mock_auth_user');
    const user = savedUser ? JSON.parse(savedUser) : null;
    mockAuth.currentUser = user;
    callback(user);
    return () => {};
  },
  createUserWithEmailAndPassword: async (auth: any, email: string, pass: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const uid = 'user_' + Math.random().toString(36).substr(2, 9);
    const newUser = { uid, email, displayName: email.split('@')[0] };
    localStorage.setItem('lumina_mock_auth_user', JSON.stringify(newUser));
    mockAuth.currentUser = newUser;
    return { user: newUser };
  },
  signInWithEmailAndPassword: async (auth: any, email: string, pass: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const db = getLocalDB();
    const userEntry = Object.entries(db.users || {}).find(([id, u]: any) => u.profile?.email === email);
    if (!userEntry) throw { code: 'auth/user-not-found' };
    
    const [uid, uData]: [string, any] = userEntry;
    const user = { uid, email, displayName: uData.profile.username };
    localStorage.setItem('lumina_mock_auth_user', JSON.stringify(user));
    mockAuth.currentUser = user;
    return { user };
  },
  signOut: async (auth: any) => {
    localStorage.removeItem('lumina_mock_auth_user');
    mockAuth.currentUser = null;
  }
};

// --- Database Mock ---
export const mockDb = {
  ref: (db: any, path: string) => ({ 
    path,
    onDisconnect: () => ({ remove: () => {} }) // Mock onDisconnect
  }),
  onValue: (ref: any, callback: (snap: any) => void) => {
    const db = getLocalDB();
    const parts = ref.path.split('/');
    let data = db;
    for (const part of parts) {
      data = data ? data[part] : null;
    }
    callback({ val: () => data });
    return () => {};
  },
  set: async (ref: any, value: any) => {
    const db = getLocalDB();
    const parts = ref.path.split('/');
    let current = db;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    saveLocalDB(db);
  },
  update: async (ref: any, value: any) => {
    const db = getLocalDB();
    const parts = ref.path.split('/');
    let current = db;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    const lastPart = parts[parts.length - 1];
    current[lastPart] = { ...(current[lastPart] || {}), ...value };
    saveLocalDB(db);
  },
  push: (ref: any, value: any) => {
    const id = 'msg_' + Date.now();
    mockDb.set({ path: `${ref.path}/${id}` }, { ...value, timestamp: Date.now() });
    return { key: id };
  },
  serverTimestamp: () => Date.now()
};

// auth.js



export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token;
  }
  return null;
};

export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('User');
    return user;
    return null;
  }
};

export const getIvFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const iv = localStorage.getItem('project');
    return iv;
  }
  return null;
}
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('User');
}

export const removeIvFromLocalStorage = () => {
  localStorage.removeItem('project');
}



const PASSWORD = 'tu-contraseña-maestra'; // Reemplaza con tu contraseña maestra

export const encryptData = async (data) => {
  const jsonData = JSON.stringify(data);
  const encoded = new TextEncoder().encode(jsonData);

  const key = await deriveKey(PASSWORD, 'encrypt');
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptor = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const encryptedData = Array.from(new Uint8Array(encryptor)).map(b => String.fromCharCode(b)).join('');
  const encryptedPayload = btoa(encryptedData);

  const encryptedIV = btoa(String.fromCharCode(...iv));

  return { encryptedPayload, encryptedIV };
}

export const decryptData = async (encryptedPayload, encryptedIV) => {
  const encryptedData = atob(encryptedPayload);
  const encoded = new Uint8Array(Array.from(encryptedData).map(c => c.charCodeAt(0)));

  const iv = Uint8Array.from(atob(encryptedIV), c => c.charCodeAt(0));

  const key = await deriveKey(PASSWORD, 'decrypt');

  const decryptor = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encoded);
  const decryptedData = new TextDecoder().decode(decryptor);
  return JSON.parse(decryptedData);
}

const deriveKey = async (password, operation) => {
  const masterKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new Uint8Array(16), iterations: 100000, hash: 'SHA-256' },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    true,
    [operation]
  );
}






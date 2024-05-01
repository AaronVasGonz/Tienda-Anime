export const generateRandomName = (fileName) => {
    const randomString = Math.random().toString(36).substring(7);
    const extension = fileName.split('.').pop();
    return `${randomString}.${extension}`;
  };
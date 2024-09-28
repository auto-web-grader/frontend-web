export const getItemFromLocalStorage = <T>(
  key: string
): T | null | undefined => {
  if (typeof localStorage !== 'undefined') {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
};

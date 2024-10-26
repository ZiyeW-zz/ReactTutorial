//profile.js
import { useAuthState, useDbData } from "./firebase";

export const useProfile = () => {
    const [user] = useAuthState();
    const [adminData, isLoading, error] = useDbData(`/admins/${user?.uid || 'guest'}`);
    const isAdmin = adminData === true;  // Check if the admin data for this user ID is true
  
    return [{ user, isAdmin }, isLoading, error];
  };
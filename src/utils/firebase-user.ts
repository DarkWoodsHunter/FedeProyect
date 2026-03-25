import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserProfile, DEFAULT_AVATAR } from '../types/user';
import { User } from 'firebase/auth';

// TODO: Connect to actual Firebase and excetue actual functions

export const createUserProfile = async (user: User): Promise<UserProfile> => {
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
    level: 1,
    xp: 0,
    maxXp: 100,
    avatar: DEFAULT_AVATAR,
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);
  return userProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const addXP = async (uid: string, xpToAdd: number): Promise<{ levelUp: boolean; newLevel: number }> => {
  const profile = await getUserProfile(uid);
  if (!profile) throw new Error('User profile not found');

  let newXp = profile.xp + xpToAdd;
  let newLevel = profile.level;
  let maxXp = profile.maxXp;
  let levelUp = false;

  while (newXp >= maxXp) {
    newXp -= maxXp;
    newLevel++;
    maxXp = Math.floor(maxXp * 1.5);
    levelUp = true;
  }

  await updateUserProfile(uid, {
    xp: newXp,
    level: newLevel,
    maxXp: maxXp,
    lastLogin: new Date(),
  });

  return { levelUp, newLevel };
};
import { AVATAR_COLORS } from "../constants/string.global";

// Helper function to get consistent user color
export const getUserColor = (userId: number): string => {
  const colorIndex = userId % AVATAR_COLORS.length;
  return AVATAR_COLORS[colorIndex];
};

// Helper to get avatar URL
export const getUserAvatarUrl = (name: string, userId: number): string => {
  const formattedName = name?.replace(/\s+/g, "+") || "User";
  const backgroundColor = getUserColor(userId);
  return `https://ui-avatars.com/api/?name=${formattedName}&background=${backgroundColor}&color=fff`;
};

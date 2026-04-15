import dbConnect from "./mongodb";
import User from "@/models/User";

export async function storeIdCardUrls(memberId: string, frontUrl: string, backUrl: string, email?: string) {
  await dbConnect();
  
  // Try to find the user by multiple identifiers for maximum reliability
  let user = null;
  
  if (email) {
    user = await User.findOne({ email: email.toLowerCase() });
  }
  
  if (!user) {
    // Falls back to search by MongoDB ID
    try {
      user = await User.findById(memberId);
    } catch (e) {
      // Invalid ID format
    }
  }
  
  if (!user) {
    // Last fallback: votersCard
    user = await User.findOne({ votersCard: memberId });
  }

  if (user) {
    user.idCardFrontUrl = frontUrl;
    user.idCardBackUrl = backUrl;
    user.idCardUpdatedAt = new Date();
    await user.save();
    return true;
  }
  
  return false;
}

export async function getIdCardUrls(memberId: string, email?: string) {
  await dbConnect();
  
  let user = null;
  if (email) {
    user = await User.findOne({ email: email.toLowerCase() });
  }
  
  if (!user) {
    try {
      user = await User.findById(memberId);
    } catch (e) {}
  }
  
  if (!user) {
    user = await User.findOne({ votersCard: memberId });
  }
  
  if (user && user.idCardFrontUrl) {
    return {
      frontUrl: user.idCardFrontUrl,
      backUrl: user.idCardBackUrl,
      updatedAt: user.idCardUpdatedAt
    };
  }
  
  return null;
}

// Aliases for backward compatibility
export const getIdCardUrl = getIdCardUrls;
export const storeIdCardUrl = storeIdCardUrls;

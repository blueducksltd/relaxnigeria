import dbConnect from "./mongodb";
import User from "@/models/User";

export async function storeIdCardUrls(memberId: string, frontUrl: string, backUrl: string) {
  await dbConnect();
  
  // Find user by memberId (this could be their MongoDB ID or a custom field like phone/email)
  // In this app, memberId in the context of the ID card seems to be the MongoDB ID or unique identifier.
  // We'll search by _id first, then by votersCard as fallback
  let user = await User.findById(memberId);
  
  if (!user) {
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

export async function getIdCardUrls(memberId: string) {
  await dbConnect();
  const user = await User.findById(memberId) || await User.findOne({ votersCard: memberId });
  
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

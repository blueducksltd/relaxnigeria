// In-memory storage for demo purposes (replace with actual database in production)
const idCardDatabase = new Map<string, { blobUrl: string; filename: string; createdAt: string; photoUrl?: string }>();

export function storeIdCardUrl(memberId: string, blobUrl: string, filename: string, photoUrl?: string) {
  idCardDatabase.set(memberId, {
    blobUrl,
    filename,
    createdAt: new Date().toISOString(),
    photoUrl
  });
}

export function getIdCardUrl(memberId: string): { blobUrl: string; filename: string; createdAt: string; photoUrl?: string } | null {
  return idCardDatabase.get(memberId) || null;
}

export function getAllStoredCards() {
  return Array.from(idCardDatabase.entries()).map(([memberId, data]) => ({
    memberId,
    ...data
  }));
}

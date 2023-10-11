import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getUserProperties = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const userProperties = await client.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    const safeUserProperties = userProperties.map((prop) => ({
      ...prop,
      createdAt: prop.createdAt.toISOString(),
    }));

    return safeUserProperties;
  } catch (error: any) {
    throw new Error(error);
  }
};

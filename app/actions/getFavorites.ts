import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

interface Params {
  favoriteIds: string[] | undefined;
}
export const getFavorites = async (params: Params) => {
  const { favoriteIds } = params;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favoriteListings = await client.listing.findMany({
      where: {
        id: {
          in: [...(favoriteIds || [])],
        },
      },
    });
    const safeFavorites = favoriteListings.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

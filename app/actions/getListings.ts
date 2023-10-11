import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export interface IListingParams {
  userId?: string;
}
export const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }
    const lisitngs = await client.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = lisitngs.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};

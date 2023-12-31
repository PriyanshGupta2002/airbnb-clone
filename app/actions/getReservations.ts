import client from "../libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
export const getReservations = async (params: IParams) => {
  const { listingId, userId, authorId } = params;
  const query: any = {};
  if (listingId) {
    query.listingId = listingId;
  }
  if (userId) {
    query.userId = userId;
  }
  if (authorId) {
    query.Listing = { userId: authorId };
  }
  try {
    const reservations = await client.reservation.findMany({
      where: query,
      include: {
        Listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      Listing: {
        ...reservation.Listing,
        createdAt: reservation.Listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

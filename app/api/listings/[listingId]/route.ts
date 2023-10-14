import { getCurrentUser } from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}
export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { listingId } = params;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }
    const listing = await client.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
};

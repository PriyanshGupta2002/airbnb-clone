import { getCurrentUser } from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { reservationId } = params;
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser) {
      return NextResponse.error();
    }
    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid Id");
    }
    const reservation = await client.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { Listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    return error;
  }
};

import { getCurrentUser } from "@/app/actions/getCurrentUser"
import client from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export const POST=async(request:Request)=>{
    const currentUser = await getCurrentUser()
    const {totalPrice,startDate,endDate,listingId} = await request.json()
    if (!currentUser || !totalPrice || !startDate || !listingId) {
        return NextResponse.error()
    }
    const listingAndReservation =   await client.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservation)
}   
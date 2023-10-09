import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/actions/getCurrentUser";


export const POST=async(request:Request)=>{
        const currentUser =await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }

    const body= await request.json()
    Object.keys(body).map((item)=>{
        if (!body[item]) {
            return NextResponse.error()
        }
    })
    const listing =await prisma.listing.create({
        data:{
            ...body,
            userId:currentUser.id,
            locationValue:body.locationValue.value,
            price:parseInt(body.price,10)
        }
    })
    return NextResponse.json(listing)

}
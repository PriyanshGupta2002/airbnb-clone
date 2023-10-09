import client from "../libs/prismadb"
import prisma from "../libs/prismadb"


export interface IParams {
    listingId:string
}
export const getListingById=async(params:IParams)=>{
    const {listingId} = params
    try {
        const listing = await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                user:true,
                reservations:true
            }
        })
        if (!listing) {
            return null
        }
        return {
            ...listing,
            createdAt:listing.createdAt.toISOString(),
            user:{
                ...listing.user,
                createdAt:listing.user.createdAt.toISOString(),
                updatedAt:listing.user.updatedAt.toISOString(),
                emailVerified:listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error) {
        return error
    }
}



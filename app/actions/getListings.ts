import client from "../libs/prismadb"

export const getListings=async()=>{
    try {
    const lisitngs = await client.listing.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
    const safeListings = lisitngs.map((listing)=>(
        {
            ...listing,
            createdAt:listing.createdAt.toISOString()
        }
    ))
    return safeListings
} catch (error:any) {
        throw new Error(error)
}
}
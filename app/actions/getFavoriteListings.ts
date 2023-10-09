import client from "../libs/prismadb"

export const getFavoriteListings = async(favoriteIds:{favoriteIds:string[]})=>{
    const listings = await client.listing.findMany({
        where:{
            id:{
                in:favoriteIds
            }
        }
    })
    return listings
}
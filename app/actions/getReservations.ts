import client from "../libs/prismadb"

interface IParams{
    listingId?:string,
    userId?:string,
    authorId?:string
}
export const getReservations = async(params:IParams)=>{
    const {listingId,userId,authorId} = params
    const query:any={}
    if (listingId) {
        query.listingId=listingId
    }
    if (userId) {
        query.userId = userId
    }
    if (authorId) {
        query.authorId = authorId
    }
    try {
        const reservations = await client.reservation.findMany({
            where:query
        })
        return reservations
    } catch (error:any) {
        throw new Error(error)
    }
}
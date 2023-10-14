import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import { getListings, IListingParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import { getCurrentUser } from "./actions/getCurrentUser";
interface HomeProps {
  searchParams: IListingParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const listingsData = getListings(searchParams);
  const currentUserData = getCurrentUser();
  const [listings, currentUser] = await Promise.all([
    listingsData,
    currentUserData,
  ]);
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

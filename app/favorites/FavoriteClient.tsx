import React from "react";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
  currentUser?: SafeUser | null;
  favoriteListings: SafeListing[];
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({
  favoriteListings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div
        className="mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      "
      >
        {favoriteListings.map((favListing) => (
          <ListingCard
            data={favListing}
            key={favListing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;

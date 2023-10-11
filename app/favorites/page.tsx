import React from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import { getFavorites } from "../actions/getFavorites";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavorites({
    favoriteIds: currentUser?.favoriteIds,
  });
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }
  return (
    <FavoriteClient
      currentUser={currentUser}
      favoriteListings={favoriteListings}
    />
  );
};

export default page;

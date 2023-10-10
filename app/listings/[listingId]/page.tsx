import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { IParams, getListingById } from "@/app/actions/getListingById";
import ClientListing from "@/app/listings/ClientListing";
import EmptyState from "@/app/components/EmptyState";
import { SafeListing, SafeUser } from "@/app/types";
import React from "react";
import { getReservations } from "@/app/actions/getReservations";

const page = async ({ params }: { params: IParams }) => {
  const listing = (await getListingById(params)) as SafeListing & {
    user: SafeUser;
  };
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }
  return (
    <>
      <ClientListing
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
      />
    </>
  );
};

export default page;

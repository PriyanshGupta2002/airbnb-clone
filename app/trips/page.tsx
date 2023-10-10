import React from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { getReservations } from "../actions/getReservations";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="Looks like you have not reserved any trips"
      />
    );
  }
  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default page;

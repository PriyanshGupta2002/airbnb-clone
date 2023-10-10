import React from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { getReservations } from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) <EmptyState title="Unauthorized" subtitle="Please login" />;
  const reservations = await getReservations({ authorId: currentUser?.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }
  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default page;

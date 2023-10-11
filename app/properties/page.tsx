import React from "react";
import { getUserProperties } from "../actions/getUserProperties";
import { getCurrentUser } from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import EmptyState from "../components/EmptyState";
import { getListings } from "../actions/getListings";

const page = async () => {
  const currentUser = await getCurrentUser();
  const properties = await getListings({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no properties"
      />
    );
  }
  return <PropertiesClient properties={properties} currentUser={currentUser} />;
};

export default page;

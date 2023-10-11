"use client";
import React from "react";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  properties: SafeListing[];
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  properties,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Hi" />
    </Container>
  );
};

export default PropertiesClient;

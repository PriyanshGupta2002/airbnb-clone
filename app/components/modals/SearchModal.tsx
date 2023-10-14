"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";
enum Steps {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(Steps.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), {
      ssr: false,
    });
  }, [location]);

  const onBack = useCallback(() => {
    setStep((prevValue) => prevValue - 1);
  }, [step]);
  const onNext = useCallback(() => {
    setStep((prevValue) => prevValue + 1);
  }, [step]);

  const onSubmit = useCallback(() => {
    if (step !== Steps.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      roomCount,
      bathroomCount,
      guestCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(Steps.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    router,
    dateRange,
    onNext,
    params,
  ]);
  const actionLabel = useMemo(() => {
    if (step === Steps.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value: any) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
  if (step === Steps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value: any) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }
  if (step === Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          onChange={(value: number) => setGuestCount(value)}
          value={guestCount}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you want?"
          onChange={(value: number) => setRoomCount(value)}
          value={roomCount}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you want?"
          onChange={(value: number) => setBathroomCount(value)}
          value={bathroomCount}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;

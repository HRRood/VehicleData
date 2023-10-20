"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./AddTripModal.module.css";
import { DateInput } from "../../form/DateInput/DateInput";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";
import { api } from "@/frontend/api/api";
import { SearchInput } from "../../form/SearchInput/searchInput";

const TripDataValidation = z.object({
  startLocation: z.string().min(1),
  endLocation: z.string().min(1),
  drivenKm: z.coerce.number().min(0),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
});

export const AddTripModal = () => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);

  const onSubmit = async (data: any, callback: () => void) => {
    api.post("/api/trips", { body: JSON.stringify({ ...data, vehicleId: selectedVehicle?.Id }) }).then((res) => {
      if (res.success) {
        mutate((key) => typeof key === "string");
        callback();
      } else {
        console.error(res.message);
      }
    });
  };
  return (
    <CreateDialog DataValidation={TripDataValidation} buttonText="Add trip" buttonColor="secondary" title="Add new trip" onSubmit={onSubmit}>
      <div className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" inputProps={{ step: 0.01 }} />
      </div>
      <div className={styles.fields_group}>
        <DateInput label="Start time" name="startDateTime" maxDate={new Date()} />
      </div>
      <div className={styles.fields_group}>
        <DateInput label="End time" name="endDateTime" maxDate={new Date()} />
      </div>
      <div className={styles.fields_group}>
        <SearchInput id="startLocation" name="startLocation" label="Start Location" />
      </div>
      <div className={styles.fields_group}>
        <SearchInput id="endLocation" name="endLocation" label="End Location" />
      </div>
    </CreateDialog>
  );
};

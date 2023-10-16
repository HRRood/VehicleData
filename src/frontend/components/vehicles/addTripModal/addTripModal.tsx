"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./AddTripModal.module.css";
import { DateInput } from "../../form/DateInput/DateInput";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";

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
    fetch("/api/trips", {
      method: "POST",
      body: JSON.stringify({ ...data, vehicleId: selectedVehicle?.Id }),
    })
      .then(() => {
        mutate((key) => typeof key === "string");
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CreateDialog DataValidation={TripDataValidation} buttonText="Add trip" buttonColor="secondary" title="Add new trip" onSubmit={onSubmit}>
      <div className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" inputProps={{ step: 0.01 }} />
      </div>
      <div className={styles.fields_group}>
        <DateInput label="Start time" name="startDateTime" />
      </div>
      <div className={styles.fields_group}>
        <DateInput label="End time" name="endDateTime" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="startLocation" name="startLocation" label="Start Location" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="endLocation" name="endLocation" label="End Location" />
      </div>
    </CreateDialog>
  );
};

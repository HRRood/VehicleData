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
import { Box } from "@radix-ui/themes";

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
    api.post("/api/trips", { body: JSON.stringify({ ...data, vehicleId: selectedVehicle?.id }) }).then((res) => {
      if (res.success) {
        mutate((key) => typeof key === "string");
        callback();
      } else {
        console.error(res.message);
      }
    });
  };
  return (
    <CreateDialog
      DataValidation={TripDataValidation}
      buttonText="Add trip"
      buttonColor="crimson"
      buttonVariant="surface"
      title="Add new trip"
      onSubmit={onSubmit}
    >
      <Box className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" step="0.01" />
      </Box>
      <Box className={styles.fields_group}>
        <DateInput label="Start time" name="startDateTime" maxDate={new Date()} />
        <TextInput id="Date" name="date" label="Date" type="date" max={new Date().getDate()} />

      </Box>
      <Box className={styles.fields_group}>
        {/* <DateInput label="End time" name="endDateTime" maxDate={new Date()} /> */}
        <TextInput id="End time" name="endDateTime" label="End time" type="date" max={new Date().getDate()} />

      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="startLocation" name="startLocation" label="Start location" />

        {/* <SearchInput id="startLocation" name="startLocation" label="Start Location" /> */}
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="endLocation" name="endLocation" label="End location" />

        {/* <SearchInput id="endLocation" name="endLocation" label="End Location" /> */}
      </Box>
    </CreateDialog>
  );
};

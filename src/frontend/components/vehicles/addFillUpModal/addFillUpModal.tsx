"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./AddFillUpModal.module.css";
import { SelectedVehicleAtom } from "@/frontend/atoms/selectedVehicleAtom";
import { useAtom } from "jotai";
import { api } from "@/frontend/api/api";
import { Box } from "@radix-ui/themes";

const FuelDataValidation = z.object({
  date: z.coerce.date(),
  drivenKm: z.coerce.number().min(0),
  litersFilled: z.coerce.number().min(0),
  cost: z.coerce.number().min(0),
  location: z.string().min(1),
  stationName: z.string().min(1),
});

export const AddFillUpModal = () => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);

  const onSubmit = async (data: any, callback: () => void) => {
    api.post("/api/fillups", { body: JSON.stringify({ ...data, vehicleId: selectedVehicle?.id }) }).then((res) => {
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
      DataValidation={FuelDataValidation}
      buttonText="Add fillup"
      buttonColor="crimson"
      buttonVariant="surface"
      title="Add new fillup"
      onSubmit={onSubmit}
    >
      <Box className={styles.fields_group}>
        <TextInput id="Date" name="date" label="Date" type="date" max={new Date().getDate()} />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" step="0.01" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="litersFilled" name="litersFilled" label="Liters" type="number" step="0.01" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="cost" name="cost" label="Costs" type="number" step="0.01" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="location" name="location" label="Location" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="stationName" name="stationName" label="Station name" />
      </Box>
    </CreateDialog>
  );
};

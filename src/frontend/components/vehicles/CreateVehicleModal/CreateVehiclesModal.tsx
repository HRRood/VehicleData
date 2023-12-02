"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./CreateVehiclesModal.module.css";
import { Box } from "@radix-ui/themes";

const VehicleDataValidation = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  licensePlate: z.string().min(6),
  odo: z.coerce.number().optional(),
});

export const CreateVehicleModal = () => {
  const onNewVehicleSubmit = async (data: any, callback: () => void) => {
    fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        mutate((key) => typeof key === "string" && key.startsWith("useVehicles"));
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CreateDialog DataValidation={VehicleDataValidation} buttonColor="crimson" buttonVariant="solid" title="Create new vehicle" onSubmit={onNewVehicleSubmit}>
      <Box className={styles.fields_group}>
        <TextInput id="make" name="make" label="Make" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="model" name="model" label="Model" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="year" name="year" label="Year" type="number" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="licensePlate" name="licensePlate" label="Licenseplate number" />
      </Box>
      <Box className={styles.fields_group}>
        <TextInput id="odo" name="odo" label="Odo" type="number" />
      </Box>
    </CreateDialog>
  );
};

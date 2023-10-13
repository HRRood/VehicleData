"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./CreateVehiclesModal.module.css";

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
    <CreateDialog
      DataValidation={VehicleDataValidation}
      buttonColor="success"
      buttonVariant="contained"
      title="Create new vehicle"
      onSubmit={onNewVehicleSubmit}
    >
      <div className={styles.fields_group}>
        <TextInput id="make" name="make" label="Make" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="model" name="model" label="Model" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="year" name="year" label="Year" type="number" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="licensePlate" name="licensePlate" label="Licenseplate number" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="odo" name="odo" label="Odo" type="number" />
      </div>
    </CreateDialog>
  );
};

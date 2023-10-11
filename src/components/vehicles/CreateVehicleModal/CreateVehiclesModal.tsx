"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { TextInput } from "@/components/form/textInput/TextInput";

import styles from "./CreateVehiclesModal.module.css";

const CharacterDataValidation = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  licensePlate: z.string().min(6),
  odo: z.coerce.number().optional(),
});

export const CreateCharacterModal = () => {
  const onNewCharacterSubmit = async (data: any, callback: () => void) => {
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
    <CreateDialog DataValidation={CharacterDataValidation} title="Create new character" onSubmit={onNewCharacterSubmit}>
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

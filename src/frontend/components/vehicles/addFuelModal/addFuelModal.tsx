"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/frontend/components/CreateDialog/CreateDialog";
import { TextInput } from "@/frontend/components/form/textInput/TextInput";

import styles from "./AddFuelModal.module.css";
import { DateInput } from "../../form/DateInput/DateInput";

const FuelDataValidation = z.object({
  date: z.coerce.date(),
  drivenKm: z.coerce.number().min(0),
  litersFilled: z.coerce.number().min(0),
  cost: z.coerce.number().min(0),
  location: z.string().min(6),
  stationName: z.string().min(1),
});

export const AddFuelModal = () => {
  const onSubmit = async (data: any, callback: () => void) => {
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
    <CreateDialog DataValidation={FuelDataValidation} buttonText="Add fuel" buttonColor="primary" title="Create new vehicle" onSubmit={onSubmit}>
      <div className={styles.fields_group}>
        <DateInput label="Date" name="date" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="litersFilled" name="litersFilled" label="Liters" type="number" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="cost" name="cost" label="Costs" type="number" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="location" name="location" label="Location" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="stationName" name="stationName" label="Station name" />
      </div>
    </CreateDialog>
  );
};

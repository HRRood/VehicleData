'use client';
import { mutate } from 'swr';
import { z } from 'zod';

import { CreateDialog } from '@/frontend/components/CreateDialog/CreateDialog';
import { TextInput } from '@/frontend/components/form/textInput/TextInput';

import styles from './AddFillUpModal.module.css';
import { DateInput } from '../../form/DateInput/DateInput';
import { SelectedVehicleAtom } from '@/frontend/atoms/selectedVehicleAtom';
import { useAtom } from 'jotai';
import { api } from '@/frontend/api/api';

const FuelDataValidation = z.object({
  date: z.coerce.date(),
  drivenKm: z.coerce.number().min(0.1),
  litersFilled: z.coerce.number().min(5),
  cost: z.coerce.number().min(0.1),
  location: z.string().min(1),
  stationName: z.string().min(1),
  note: z.string(),
});

export const AddFillUpModal = () => {
  const [selectedVehicle] = useAtom(SelectedVehicleAtom);

  const onSubmit = async (data: any, callback: () => void) => {
    api.post('/api/fillups', { body: JSON.stringify({ ...data, vehicleId: selectedVehicle?.id }) }).then((res) => {
      if (res.success) {
        mutate((key) => typeof key === 'string');
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
      buttonColor="primary"
      title="Add new fillup"
      onSubmit={onSubmit}
    >
      <div className={styles.fields_group}>
        <DateInput label="Date" name="date" maxDate={new Date()} />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="drivenKm" name="drivenKm" label="Driven KM" type="number" inputProps={{ step: 0.01 }} />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="litersFilled" name="litersFilled" label="Liters" type="number" inputProps={{ step: 0.01 }} />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="cost" name="cost" label="Costs" type="number" inputProps={{ step: 0.01 }} />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="location" name="location" label="Location" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="stationName" name="stationName" label="Station name" />
      </div>
      <div className={styles.fields_group}>
        <TextInput id="note" name="note" label="Note" />
      </div>
    </CreateDialog>
  );
};

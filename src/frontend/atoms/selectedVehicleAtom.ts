import { Vehicles } from "@prisma/client";
import { atom } from "jotai";

export const SelectedVehicleAtom = atom<Vehicles | null>(null);

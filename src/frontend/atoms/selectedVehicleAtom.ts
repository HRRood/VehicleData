import { atom } from "jotai";
import { Vehicle } from "../hooks/useVehicles";

export const SelectedVehicleAtom = atom<Vehicle | null>(null);

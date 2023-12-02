import { VehicleList } from "./VehicleList";
import { CreateVehicleModal } from "./CreateVehicleModal/CreateVehiclesModal";
import { Box, Text } from "@radix-ui/themes";

export const VehiclesWrapper = async () => {
  return (
    <Box style={{ maxWidth: "1300px", margin: "auto" }}>
      <Box style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", marginBottom: "20px" }}>
        <Text>My vehicles</Text>
        <CreateVehicleModal />
      </Box>
      <VehicleList />
    </Box>
  );
};

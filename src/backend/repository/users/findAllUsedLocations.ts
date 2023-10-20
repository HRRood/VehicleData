import { prisma } from "@/backend/lib/prisma";

export async function FindAllUsedLocations(email: string) {
  const tripLocations: { location: string }[] = await prisma.$queryRaw`
  SELECT *
  FROM (
    SELECT StartLocation as location FROM Trips t inner join Vehicles v on t.VehicleId = v.id inner join Users u on v.UserId = u.id where u.Email = ${email}
    UNION
    SELECT EndLocation as location FROM Trips t inner join Vehicles v on t.VehicleId = v.id inner join Users u on v.UserId = u.id where u.Email = ${email}
  ) AS x
`;

  const fillUpLocations = await prisma.fillups.findMany({
    select: {
      Location: true,
    },
    distinct: ["Location"],
    where: {
      Vehicles: {
        Users: {
          Email: email,
        },
      },
    },
  });
  const mappedFillup = fillUpLocations.map((fillup) => fillup.Location);
  const mappedTrip = tripLocations.map((trip) => trip.location);

  const combinedLocations = [...mappedFillup, ...mappedTrip];
  // filter duplicates
  const uniqueLocations = combinedLocations.filter((item, index) => combinedLocations.indexOf(item) === index);

  // sort alphabetically
  uniqueLocations.sort((a, b) => a.localeCompare(b));

  return uniqueLocations;
}

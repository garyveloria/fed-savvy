export const searchLaunches = (
  keyword,
  launches,
  launchpads,
  setNumItems,
  setFilteredLaunches,
  setFilteredLaunchpads
) => {
  let filteredLaunches = launches;
  let filteredLaunchpads = launchpads;

  if (keyword) {
    filteredLaunches = filteredLaunches.filter((launch) => {
      const { flight_number, rocket, payloads } = launch;
      const { rocket_name } = rocket;
      const payloadIds = payloads.map((payload) => payload.payload_id);

      return (
        flight_number.toString().includes(keyword) ||
        rocket_name.toLowerCase().includes(keyword.toLowerCase()) ||
        payloadIds.some((payloadId) =>
          payloadId.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    });
  }

  setFilteredLaunches(filteredLaunches);
  setFilteredLaunchpads(filteredLaunchpads);

  const filteredItemCount = filteredLaunches.length;
  setNumItems(filteredItemCount);
};

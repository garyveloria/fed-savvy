import React from "react";

export const searchLaunches = (
  launches,
  launchpads,
  keyword,
  launchpadId,
  setFilteredLaunches,
  setFilteredLaunchpads,
  setFilteredItemCount
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
                payloadIds.some((payloadId) => payloadId.toLowerCase().includes(keyword.toLowerCase()))
            );
        });
    }

  // Filter using Launchpad
  if (launchpadId !== "Any") {
    filteredLaunches = filteredLaunches.filter((launch) => {
      const { launch_site } = launch;
      const { site_id } = launch_site;

      const launchpad = launchpads.find(
        (launchpad) => launchpad.id === site_id
      );
      return launchpad && launchpad.full_name === launchpadId;
    });

    filteredLaunchpads = filteredLaunchpads.filter((launchpadItem) => {
      return launchpadItem.full_name === launchpadId;
    });
  }

  setFilteredLaunches(filteredLaunches);
  setFilteredLaunchpads(filteredLaunchpads);

  const filteredItemCount = filteredLaunches.length;
  setFilteredItemCount(filteredItemCount);
};

export const getLaunchpadByName = (launchpads) => {
  const launchpadIds = launchpads
    ? ["Any", ...launchpads.map((launchpad) => launchpad.full_name)]
    : ["Any"];
  return launchpadIds.map((name, index) => (
    <option key={index} value={name}>
      {name}
    </option>
  ));
};

import React from "react";
import { MissionPatchImage } from "../Style/MainStyle.js";

const LaunchIcons = ({ launch }) => {
  let icon = (
    <MissionPatchImage src={launch.links.mission_patch} alt="Mission Patch" />
  );

  return icon;
};

export default LaunchIcons;

import React from "react";
import Icon from "../Components/LaunchIcons";

import {
  FlightNumContainer,
  TitleContainer,
  FailedMissionText,
  SubtitleContainer,
  ButtonsContainer,
  ResultContainer,
  ResultInfoContainer,
} from "../Style/MainStyle.js";

// const LaunchIcons = ({ launch }) => {
//   let icon = (
//     <MissionPatchImage src={launch.links.mission_patch} alt="Mission Patch" />
//   );

//   return icon;
// };

const LaunchFlightNumber = ({ launch }) => {
  const { flight_number } = launch;

  let flightNumber = (
    <FlightNumContainer>
      <h5>#{flight_number}</h5>
      <span>Flight Number</span>
    </FlightNumContainer>
  );

  return flightNumber;
};

const LaunchTitle = ({ launch }) => {
// The code uses destructuring assignment to extract specific properties from the launch prop.
  const { rocket, payloads, launch_success, land_success } = launch;
  const { rocket_name } = rocket;

// This line uses the map function to create an array of payload IDs by extracting the payload_id property from each item in the payloads array.
  const payloadIds = payloads.map((payload) => payload.payload_id);


// Title Rendering
  let title = (
    <TitleContainer>
      <span>
        {rocket_name} - {payloadIds.join(", ")}
      </span>
      {(!launch_success || !land_success) && (
        <FailedMissionText>
          <span> - </span>Failed Mission
        </FailedMissionText>
      )}
    </TitleContainer>
  );

  return title;
};

const LaunchSubtitle = ({ launch, launchpads }) => {
  const { launch_date_local, launch_site } = launch;
  const { site_id } = launch_site;
  const launchpad = launchpads.find((launchpad) => launchpad.id === site_id);

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    const lastDigit = day % 10;

    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  if (launchpad) {
    const { full_name } = launchpad;
    const launchDate = new Date(launch_date_local);
    const day = launchDate.getDate();
    const formattedDate = `${getOrdinalSuffix(day)} ${launchDate.toLocaleString(
      "en-US",
      { month: "long" }
    )} ${launchDate.getFullYear()}`;
    const time = launchDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <SubtitleContainer>
        Launched <strong>{formattedDate}</strong> at <strong>{time}</strong>{" "}
        from <strong>{full_name}</strong>
      </SubtitleContainer>
    );
  }
};

const LaunchButtons = ({ launch }) => {
  const {
    links: {
      reddit_campaign,
      reddit_launch,
      reddit_recovery,
      reddit_media,
      presskit,
      article_link,
      video_link,
    },
  } = launch;

  return (
    <ButtonsContainer>
      {reddit_campaign && (
        <a href={reddit_campaign} target="_blank" rel="noopener noreferrer">
          <button>Reddit Campaign</button>
        </a>
      )}
      {reddit_launch && (
        <a href={reddit_launch} target="_blank" rel="noopener noreferrer">
          <button>Reddit Launch</button>
        </a>
      )}
      {reddit_recovery && (
        <a href={reddit_recovery} target="_blank" rel="noopener noreferrer">
          <button>Reddit Recovery</button>
        </a>
      )}
      {reddit_media && (
        <a href={reddit_media} target="_blank" rel="noopener noreferrer">
          <button>Reddit Media</button>
        </a>
      )}
      {presskit && (
        <a href={presskit} target="_blank" rel="noopener noreferrer">
          <button>Press</button>
        </a>
      )}
      {article_link && (
        <a href={article_link} target="_blank" rel="noopener noreferrer">
          <button>Article</button>
        </a>
      )}
      {video_link && (
        <a href={video_link} target="_blank" rel="noopener noreferrer">
          <button>Video</button>
        </a>
      )}
    </ButtonsContainer>
  );
};

export const GetLaunches = ({ launches, launchpads }) => {
  return launches.map((launch) => (
    <ResultContainer key={launch.flight_number}>
      {<Icon launch={launch} />}

      <ResultInfoContainer>
        {<LaunchTitle launch={launch} />}
        {<LaunchSubtitle launch={launch} launchpads={launchpads} />}
        {<LaunchButtons launch={launch} />}
      </ResultInfoContainer>

      {<LaunchFlightNumber launch={launch} />}
    </ResultContainer>
  ));
};

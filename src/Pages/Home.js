import React, { useState, useEffect, useRef } from "react";
import { fetchLaunches, fetchLaunchPads } from "../Components/FetchApiData";
import { GetLaunches } from "../Components/RenderApiData";
import { savvyStrings } from "../Components/Variables";
import { searchLaunches } from "../Components/FilterEvent";
import {
  MainContainer,
  HeroBackgroundImage,
  HeroTitle,
  HeroMainText,
  ArrowDownButton,
  FooterContainer,
  FooterText,
  BacktoTop,
  MissionContainer,
  SearchContainer,
  SearchButton,
  SearchBar,
  Input,
  MainResultContainer,
} from "../Style/MainStyle.js";

function Home() {
  // ---- Store Data ---- //
  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchpads] = useState([]);

  // ---- Store Search Filter ---- //
  const [keyword, setKeyword] = useState("");
  // const [launchpadId, setLaunchpadId] = useState('Any');
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [filteredLaunchpads, setFilteredLaunchpads] = useState([]);

  const [numItems, setNumItems] = useState(0);

  const [loading, setLoading] = useState(true);

  const missionContainer = useRef(null);

  const arrowDownClick = () => {
    missionContainer.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const fetchedLaunches = await fetchLaunches();
      const fetchedLaunchpads = await fetchLaunchPads();

      setLaunches(fetchedLaunches);
      setLaunchpads(fetchedLaunchpads);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // const handleFilterClick = () => {
  //   handleFilterButtonClick(
  //     launches,
  //     launchpads,
  //     keyword,
  //     setFilteredLaunches,
  //     setFilteredLaunchpads,
  //   );
  // };

  const handleSearch = () => {
      searchLaunches(keyword, launches, launchpads, setNumItems, setFilteredLaunches, setFilteredLaunchpads);
  };

  // const searchLaunches = async (keyword, launchId, minYear, maxYear) => {
  //   try {
  //     const launchesData = await fetchLaunches();
      
  //     const filteredLaunches = launchesData.filter((launch) => {
  //       const { flight_number, rocket, payloads, date_utc } = launch;
  //       const { rocket_name } = rocket;
  //       const payloadIds = payloads.map((payload) => payload.payload_id);
  
  //       return (
  //         (flight_number.toString().includes(keyword) ||
  //         rocket_name.toLowerCase().includes(keyword.toLowerCase()) ||
  //         payloadIds.some((payloadId) =>
  //           payloadId.toLowerCase().includes(keyword.toLowerCase()))) &&
  //         (!launchId || flight_number.toString() === launchId) &&
  //         (!minYear || parseInt(date_utc.substring(0, 4)) >= parseInt(minYear)) &&
  //         (!maxYear || parseInt(date_utc.substring(0, 4)) <= parseInt(maxYear))
  //       );
  //     });
  
  //     return filteredLaunches;
  //   } catch (error) {
  //     console.error("Error searching launches:", error);
  //     throw error;
  //   }
  // };


  return (
    <>
      <MainContainer>
        <HeroBackgroundImage>
          <HeroTitle>{savvyStrings.heroTitle}</HeroTitle>
          <HeroMainText>{savvyStrings.heroMainText}</HeroMainText>
          <ArrowDownButton onClick={arrowDownClick} />
        </HeroBackgroundImage>
        <MissionContainer ref={missionContainer}>
          <SearchContainer>
            <SearchBar className="keyword">
              <label htmlFor="keyword">Seach via Core Serial</label>
              <Input
                type="text"
                placeholder="eg. Merlin"
                value={ keyword }
                onChange={(event) => setKeyword(event.target.value)}
                autoComplete="off"
              />
            </SearchBar>
            <SearchButton onClick={handleSearch}>Apply</SearchButton>
          </SearchContainer>
          <MainResultContainer>
            {loading && <p>Loading Missions...</p>}
            {!loading && (
              <div>
                <p>Showing {numItems} Mission</p>
                <ul>
                  <GetLaunches launches={filteredLaunches} launchpads={filteredLaunchpads} />
                </ul>
              </div>
            )}
          </MainResultContainer>
          <FooterContainer>
            <FooterText>{savvyStrings.footerText}</FooterText>
            <BacktoTop onClick={scrollToTop}>{savvyStrings.backToTopText}</BacktoTop>
          </FooterContainer>
        </MissionContainer>
      </MainContainer>
    </>
  );
}

export default Home;

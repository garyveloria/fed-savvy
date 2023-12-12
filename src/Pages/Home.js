import React, { useState, useEffect, useRef } from "react";
import { fetchLaunches, fetchLaunchPads } from "../Components/FetchApiData";
import { GetLaunches } from "../Components/RenderApiData";
import { savvyStrings } from "../Components/Variables";
import { searchLaunches, getLaunchpadByName } from "../Components/FilterEvent";
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
  Select,
  MainResultContainer,
} from "../Style/MainStyle.js";

function Home() {
  // All Data
  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchpads] = useState([]);

  // Search Filtered
  const [keyword, setKeyword] = useState("");
  const [launchpadId, setLaunchpadId] = useState("Any");

  // Filtered Data
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [filteredLaunchpads, setFilteredLaunchpads] = useState([]);

  // Filtered Data Count
  const [filteredItemCount, setFilteredItemCount] = useState(0);

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

  const handleSearch = () => {
    searchLaunches(
      launches,
      launchpads,
      keyword,
      launchpadId,
      setFilteredLaunches,
      setFilteredLaunchpads,
      setFilteredItemCount
    );
  };

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
              <label htmlFor="keyword">keyword</label>
              <Input
                type="text"
                placeholder="eg. Falcon"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)} // inline function (set current value of inputs)
                autoComplete="off"
              />
            </SearchBar>
            <SearchBar className="launchpad">
              <label htmlFor="launchpad">Launchpad</label>
              <Select
                id="launchpads"
                value={launchpadId}
                onChange={(event) => setLaunchpadId(event.target.value)}
              >
                {getLaunchpadByName(launchpads)}
              </Select>
            </SearchBar>
            <SearchBar className="minYear">
              <label htmlFor="min-year">Min Year</label>
              <Select id="min-year">
                <option value="Any">Any</option>
              </Select>
            </SearchBar>
            <SearchBar className="maxYear">
              <label htmlFor="max-year">Max Year</label>
              <Select id="max-year">
                <option value="Any">Any</option>
              </Select>
            </SearchBar>
            <SearchButton onClick={handleSearch}>Apply</SearchButton>
          </SearchContainer>
          <MainResultContainer>
            {loading && <p>Loading Missions...</p>}
            {!loading && (
              <div>
                <p>Showing {filteredItemCount} Missions</p>
                <ul>
                  {
                    <GetLaunches
                      launches={filteredLaunches}
                      launchpads={filteredLaunchpads}
                    />
                  }
                </ul>
              </div>
            )}
          </MainResultContainer>
          <FooterContainer>
            <FooterText>{savvyStrings.footerText}</FooterText>
            <BacktoTop onClick={scrollToTop}>
              {savvyStrings.backToTopText}
            </BacktoTop>
          </FooterContainer>
        </MissionContainer>
      </MainContainer>
    </>
  );
}

export default Home;

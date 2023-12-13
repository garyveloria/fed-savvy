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
  const [minYear, setMinYear] = useState("Any");
  const [maxYear, setMaxYear] = useState("Any");

  // --------- Store unique value of years --------- //
  const [yearOptions, setYearOptions] = useState([]);

  // Filtered Data
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [filteredLaunchpads, setFilteredLaunchpads] = useState([]);

  // Filtered Data Count
  const itemCount = launches.length;
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

      // Extract unique launch years from launches data
      const uniqueYears = [
        ...new Set(
          fetchedLaunches.map((launch) =>
            new Date(launch.launch_date_local).getFullYear()
          )
        ),
      ];
      const sortedYears = uniqueYears.sort();

      // Update year options for select inputs
      setYearOptions(sortedYears);
      setMinYear("Any");
      setMaxYear("Any");

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
      minYear,
      maxYear,
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
            <SearchBar className="minyear">
              <label htmlFor="min-year">Min Year</label>
              <Select
                id="min-year"
                value={minYear}
                onChange={(event) => setMinYear(event.target.value)}
              >
                <option value="Any">Any</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </Select>
            </SearchBar>
            <SearchBar className="maxyear">
              <label htmlFor="max-year">Max Year</label>
              <Select
                id="max-year"
                value={maxYear}
                onChange={(event) => setMaxYear(event.target.value)}
              >
                <option value="Any">Any</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </Select>
            </SearchBar>
            <SearchButton onClick={handleSearch}>Apply</SearchButton>
          </SearchContainer>
          <MainResultContainer>
            {loading && <p>Loading Missions...</p>}
            {!loading && (
              <div>
                <p>
                  Showing{" "}
                  {keyword !== "" ||
                  launchpadId !== "Any" ||
                  minYear !== "Any" ||
                  maxYear !== "Any" ? filteredItemCount
                    : itemCount}{" "}
                  Missions
                </p>
                <ul>
                  {keyword !== "" ||
                  launchpadId !== "Any" ||
                  minYear !== "Any" ||
                  maxYear !== "Any" ? (
                    <GetLaunches
                      launches={filteredLaunches}
                      launchpads={filteredLaunchpads}
                    />
                  ) : (
                    <GetLaunches launches={launches} launchpads={launchpads} />
                  )}
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

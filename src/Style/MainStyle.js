import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import backgroundImg from "../Assets/space-photo.jpeg";
import arrowDownImage from "../Assets/down-chevron.svg";

// Hero Section //
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeroBackgroundImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: brightness(100%);
  }
`;

export const HeroTitle = styled.h3`
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 4.75px;
  text-transform: uppercase;
  text-align: left;
  color: #ffffff;
  margin-left: 50px;
  z-index: 0;
  margin-top: 20px;

  @media (max-width: 960px) {
    font-size: 18px;
  }
`;

export const HeroMainText = styled.h1`
  text-transform: capitalize;
  text-align: center;
  font-weight: 400;
  font-size: 80px;
  letter-spacing: 4.5px;
  z-index: 0;
  margin-top: 250px;

  @media (max-width: 960px) {
    font-size: 60px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 250px;
`;

const ArrowButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  background: url(${arrowDownImage}) center no-repeat;
  background-size: contain;
  cursor: pointer;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%)
    contrast(100%);

  @media (max-width: 850px) {
    width: 40px;
    height: 40px;
  }
`;

export const ArrowDownButton = ({ onClick }) => {
  return (
    <ArrowContainer>
      <ArrowButton onClick={onClick} />
    </ArrowContainer>
  );
};

// Mission Section //

export const MissionContainer = styled.div`
  position: relative;
  background-color: #eaedf1;
  padding: 20px 40px;
  overflow-y: auto;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f9fafa;
  padding: 50px 50px 50px 30px;
  border-bottom: 0.5px solid #dddddd;

  .keyword {
    width: 100%;
  }

  @media (min-width: 850px) {
    flex-direction: row;

    .keyword {
      width: 30vw;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #656565;

  label {
    font-weight: bold;
    text-align: left;
  }
`;

export const Input = styled.input`
  margin-top: 10px;
  padding: 12px 30px 15px 15px;
  font-size: 16px;
  text-align: left;
`;

export const MainResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 50px;
  color: #000000;
`;

export const SearchButton = styled.button`
  background-color: #1fbba6;
  color: #ffffff;
  margin-top: 30px;
  margin-left: 20px;
  padding: 15px;
  border: none;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    border: 2px solid #1fbba6;
    background-color: #ffffff;
    color: #1fbba6;
    padding: 13px;
  }

  @media (min-width: 850px) {
    margin-bottom: 2px;
  }
`;

// Result Section

export const MissionPatchImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  flex-shrink: 0;
  margin-bottom: 10px;

  @media (min-width: 850px) {
    margin-bottom: 0px;
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 0.5px solid #dddddd;

  @media (min-width: 850px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ResultInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 0px 30px;

  strong {
    color: #7c8185;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  @media (min-width: 850px) {
    flex-direction: row;
  }
`;

export const SubtitleContainer = styled.p`
  text-align: center;
  padding: 10px 0px;
  color: #7c8185;

  @media (min-width: 850px) {
    text-align: left;
  }
`;

export const FailedMissionText = styled.span`
  color: red;
  margin-left: 5px;

  span {
    color: #000000;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 25px;

  button {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    color: #7c8185;
    padding: 10px 25px;
    margin: 7px;
    font-size: 15px;

    &:hover {
      background-color: #7c8185;
      color: #ffffff;
    }
  }

  @media (min-width: 850px) {
    flex-direction: row;
    justify-content: flex-start;
    width: 65vw;
  }
`;

export const FlightNumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-grow: 1;
  color: #000000;
  width: 100%;

  h5 {
    font-size: 25px;
  }

  span {
    color: #7c8185;
  }

  @media (min-width: 850px) {
    width: 35vw;
    align-items: unset;
  }
`;

// Footer Section //

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 0 10px 0;
  justify-content: space-between;
`;

export const FooterText = styled.span`
  color: #7c8185;
`;

export const BacktoTop = styled.a`
  color: #7c8185;
  text-decoration: underline;
  cursor: pointer;
`;
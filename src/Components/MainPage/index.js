import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../Search/index";

import { API_KEY } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ background }) => `url('${background}') no-repeat center`};
  background-size: cover;
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;

  @media (min-width: 960px) {
    width: 60%;
    height: 60%;
  }
`;

const Heading = styled.h1`
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.5em;
  margin: 10px 0px;

  @media (min-width: 960px) {
    font-size: 2.5em;
    margin: 30px 0px;
  }
`;

const Paragraph = styled.p`
  display: block;
  font-size: 1em;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;

  @media (min-width: 960px) {
    font-size: 1.2em;
  }

  a {
    text-decoration: underline;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
  }

  span {
    font-weight: 300;
  }
`;

const Hero = () => {
  const [background, setBackground] = useState(null);

  const fetchBackgroundImage = async () => {
    try {
      const request = await fetch(
        `https://api.unsplash.com/photos/random?count=1&client_id=${API_KEY}`
      );
      const response = await request.json();
      setBackground(response[0].urls.regular);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBackgroundImage();
  }, [background]);

  return (
    <>
      {background && (
        <Wrapper background={background}>
          <Container>
            <Heading>Unsplash</Heading>

            <Paragraph>
              The internet's source of{" "}
              <a
                href='https://unsplash.com/license'
                target='_blank'
                rel='noreferrer'
              >
                frelly-usable images
              </a>
            </Paragraph>

            <Paragraph>Powered by creators everywhere.</Paragraph>

            <Search />

            <Paragraph>
              Trending:{" "}
              <span>flower, wallpapers, backgrounds, happy, love</span>
            </Paragraph>
          </Container>
        </Wrapper>
      )}
    </>
  );
};;

export default Hero;

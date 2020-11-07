import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API_KEY } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: 960px) {
    width: 90%;
  }
`;

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 50px;
  }
`;

const AuthorImage = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  margin-right: 5px;

  img {
    width: 100%;
    height: auto;
  }
`;

const ImageDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  font-weight: 600;
`;

const ImagePlace = styled.p`
  font-weight: 400;
`;

const ImageBox = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;

const ModalComponent = ({ photo }) => {
  const [photoLocation, setPhotoLocation] = useState(null);
  const { urls, user, id } = photo;

  const handleSearchLocation = async () => {
    try {
      const request = await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=${API_KEY}`
      );
      const response = await request.json();
      setPhotoLocation(response.location.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearchLocation();
  }, []);

  return (
    <Wrapper>
      <AuthorBox>
        <AuthorImage>
          <img src={user.profile_image.small} alt={user.name} />
        </AuthorImage>
        <ImageDescriptionBox>
          <AuthorName>{user.name}</AuthorName>
          <ImagePlace>
            {photoLocation ? photoLocation : "Not specified location"}
          </ImagePlace>
        </ImageDescriptionBox>
      </AuthorBox>
      <ImageBox>
        <img src={urls.small} alt={user.name} />
      </ImageBox>
    </Wrapper>
  );
};

export default ModalComponent;

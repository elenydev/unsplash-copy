import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Search from "../Search";
import {
  selectPhotos,
  selectQueryParam,
  setQueryParam,
  setShouldShowDataList,
} from "../../PhotosReducer/photosSlice";
import Masonry from "react-masonry-css";
import { API_KEY } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 90%;
  max-width: 90%;
  margin: 0 auto;
  overflow-y: scroll;
  overflow: hidden;
  @media (min-width: 960px) {
    min-width: 100%;
  }
`;

const PhotosWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 960px) {
    width: 80%;
  }

  .my-masonry-grid {
    display: flex;
    margin-left: -30px;
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px;
    background-clip: padding-box;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  img {
    display: inline-block;
    margin: 0 0 0.3em;
    width: 100%;
  }
`;

const Header = styled.h1`
  display: flex;
  font-weight: 800;
  text-transform: Capitalize;
  margin-bottom: 10px;

  width: 95%;

  @media (min-width: 960px) {
    width: 80%;
  }
`;

const TagsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.p`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 6px;
  text-align: center;
  font-size: 0.8em;
  font-weight: 400;
  border: 1px solid #d1d1d1;
  color: rgba(0, 0, 0, 0.7);
  margin: 7px;
  text-transform: capitalize;
  cursor: pointer;
`;

const AllTagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
`;

const AllTagsItem = styled.p`
  text-align: center;
  text-transform: capitalize;
  transition: border-color 0.1s ease-in-out;
  padding: 4px;
  width: fit-content;
  font-size: 0.75em;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid #d1d1d1;
  @media (min-width: 960px) {
    padding: 7px;
    font-size: 0.85em;
    width: 120px;
    margin: 5px;
  }
`;

const removeDuplicatesFromArray = (array) => {
  const uniqueItemsArray = [...new Set(array)];

  return uniqueItemsArray;
};

const ResultPage = React.memo((props) => {
  const fetchedPhotos = useSelector(selectPhotos);
  const queryParam = useSelector(selectQueryParam);
  const [photos, setPhotos] = useState(fetchedPhotos);
  const dispatch = useDispatch();

  let tagsArray = [];

  const handleSearch = async (tagTitle, event) => {
    event.preventDefault();

    try {
      const request = await fetch(
        `https://api.unsplash.com/search/photos?query=${tagTitle}&per_page=30&client_id=${API_KEY}`
      );
      const response = await request.json();
      dispatch(setQueryParam(tagTitle));
      dispatch(setShouldShowDataList(false));
      dispatch(setPhotos(response.results));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => setPhotos(fetchedPhotos), [fetchedPhotos]);

  return (
    <Wrapper>
      <Search isResultPage={true} />
      {photos.length > 0 && queryParam !== "" ? (
        <Header>{queryParam}</Header>
      ) : (
        <Header>Please provide a collection name</Header>
      )}
      <PhotosWrapper>
        <Masonry
          breakpointCols={{
            default: 3,
            900: 2,
            500: 1,
          }}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {photos.length > 1 && queryParam !== ""
            ? photos.map((photo, index) => {
                return (
                  <PhotoBox key={index}>
                    <img src={photo.urls.regular} />
                    <TagsBox>
                      {photo.tags.map((tag, index) => {
                        tagsArray.push(tag.title);
                        return (
                          <Tag
                            key={index}
                            onClick={(event) => handleSearch(tag.title, event)}
                          >
                            {tag.title}
                          </Tag>
                        );
                      })}
                    </TagsBox>
                  </PhotoBox>
                );
              })
            : []}
        </Masonry>
        <AllTagsContainer>
          {removeDuplicatesFromArray(tagsArray).map((tag, index) => (
            <AllTagsItem
              key={index}
              onClick={(event) => handleSearch(tag, event)}
            >
              {tag}
            </AllTagsItem>
          ))}
        </AllTagsContainer>
      </PhotosWrapper>
    </Wrapper>
  );
});

export default ResultPage;

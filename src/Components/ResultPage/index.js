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
  width: 100%;
  font-weight: 800;
  margin-left: 25px;
  text-transform: Capitalize;
  margin-bottom: 10px;
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
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: 400;
  margin: 7px;
  text-transform: capitalize;
  cursor: pointer;
`;

const AllTagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
`;

const AllTagsItem = styled.p`
  text-align: center;
  border-color: #d1d1d1;
  text-transform: capitalize;
  transition: border-color 0.1s ease-in-out;
`;

const removeDuplicatesFromArray = (array) => {
  const arr = [];
  array.map((el) => {
    if (arr.includes(el.title)) {
      return;
    } else {
      arr.push(el.title);
    }
  });

  return arr;
};

const ResultPage = () => {
  const fetchedPhotos = useSelector(selectPhotos);
  const queryParam = useSelector(selectQueryParam);
  const [photos, setPhotos] = useState(fetchedPhotos);
  const dispatch = useDispatch();

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
      {photos.length > 0 && queryParam != "" ? (
        <Header>{queryParam}</Header>
      ) : (
        <Header>Please provide a collection name</Header>
      )}
      <AllTagsContainer>
        {/* {tags.map((tag) => (
          <AllTagsItem>{tag}</AllTagsItem>
        ))} */}
      </AllTagsContainer>
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
      </PhotosWrapper>
    </Wrapper>
  );
};

export default ResultPage;

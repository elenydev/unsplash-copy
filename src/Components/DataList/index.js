import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPhotos,
  setQueryParam,
  setShouldShowDataList,
} from "../../PhotosReducer/photosSlice";

import { API_KEY } from "../../constants";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 60px;
  z-index: 1;
  background-color: white;
  color: rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  overflow-y: scroll;
  overflow-y: auto;
  max-height: 25vh;
`;

const DataList = styled.datalist`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column-reverse;
  font-size: 1em;
`;

const ListItem = styled.option`
  margin: 3px 0px;
  padding: 5px 8px;
  transition: 0.2s all;

  cursor: ${({ disabled }) => (disabled ? "normal" : "pointer")};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DataListComponent = React.memo(({ list }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = async (queryParam, event) => {
    event.preventDefault();

    try {
      const request = await fetch(
        `https://api.unsplash.com/search/photos?query=${queryParam}&per_page=30&client_id=${API_KEY}`
      );
      const response = await request.json();
      dispatch(setPhotos(response.results));
      dispatch(setShouldShowDataList(false));
      dispatch(setQueryParam(queryParam));
      history.push("/photos");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <DataList id='photos-datalist'>
        {list.length === 0 ? (
          <ListItem disabled={true}>No results...</ListItem>
        ) : (
          list.map((item, index) => (
            <ListItem
              key={index}
              onClick={(event) => handleSearch(item, event)}
            >
              {item}
            </ListItem>
          ))
        )}
      </DataList>
    </Wrapper>
  );
});

export default DataListComponent;

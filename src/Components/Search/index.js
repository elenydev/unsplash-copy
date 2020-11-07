import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import DataListComponent from "../DataList/index.js";
import { useHistory } from "react-router-dom";
import {
  setPhotos,
  setQueryParam,
  setShouldShowDataList,
  selectShouldShowDataList,
  selectQueryParam,
} from "../../PhotosReducer/photosSlice";
import { API_KEY } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;

  @media (min-width: 960px) {
    margin: 35px 0;
  }
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 4px;
  padding: 7px 0;
  position: relative;

  ${(props) =>
    props.isResultPage &&
    css`
      width: 70%;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.9);
      border-radius: 25px;
    `}

  .submitLabel {
    padding: 0px 7px;
  }

  @media (min-width: 960px) {
    padding: 12px 0;

    .submitLabel {
      padding: 0px 12px;
    }
  }
`;

const InputLabel = styled.label`
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding-left: 5px;
  height: 100%;
  font-size: 0.8em;

  ${(props) =>
    props.isResultPage &&
    css`
      background-color: transparent;
    `}

  @media (min-width: 960px) {
    font-size: 1em;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
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

const Search = React.memo(({ isResultPage }) => {
  const { register, handleSubmit } = useForm();
  const shouldShowDataList = useSelector(selectShouldShowDataList);
  const queryParam = useSelector(selectQueryParam);
  const [defaultInputValue, setDefaultInputValue] = useState(queryParam);
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const searchRef = useRef();

  const handleClickOutsideOfDataList = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      dispatch(setShouldShowDataList(false));
    }
    return;
  };

  const handleDataList = async () => {
    try {
      const request = await fetch(
        `https://api.unsplash.com/search/collections?query=${inputValue}&client_id=${API_KEY}`
      );
      const response = await request.json();
      const resultsArray = response.results;
      let collectionOfCategories = [];
      collectionOfCategories = removeDuplicatesFromArray(resultsArray);
      setDataList(collectionOfCategories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (data, event) => {
    event.preventDefault();

    try {
      const request = await fetch(
        `https://api.unsplash.com/search/photos?query=${inputValue}&per_page=30&client_id=${API_KEY}`
      );
      const response = await request.json();
      dispatch(setPhotos(response.results));
      dispatch(setShouldShowDataList(false));
      dispatch(setQueryParam(inputValue));
      history.push("/photos");
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (inputValue.length > 2) {
        setDefaultInputValue("");
        dispatch(setShouldShowDataList(true));
        handleDataList();
      } else {
        return;
      }
    }, 500);
    return () => clearTimeout(timeoutHandler);
  }, [inputValue]);

  useEffect(() => {
    setDefaultInputValue(queryParam);
    dispatch(setShouldShowDataList(false));
  }, [queryParam]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideOfDataList, true);

    return () => {
      document.removeEventListener("click", handleClickOutsideOfDataList, true);
    };
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(handleSearch)} isResultPage={isResultPage}>
        <label className='submitLabel'>
          <Button type='submit' id='submit'>
            <SearchIcon />
          </Button>
        </label>

        <InputLabel>
          <Input
            type='search'
            placeholder='Search free high-resolution photos'
            name='photoName'
            onChange={handleInputValue}
            ref={register}
            required
            autoComplete='off'
            value={defaultInputValue !== "" ? defaultInputValue : inputValue}
            isResultPage={isResultPage}
            id='photos-datalist'
          />
        </InputLabel>
        {inputValue.length > 2 && shouldShowDataList ? (
          <div ref={searchRef}>
            <DataListComponent list={dataList} />
          </div>
        ) : null}
      </Form>
    </Wrapper>
  );
});

export default Search;

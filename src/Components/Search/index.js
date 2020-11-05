import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import DataListComponent from "../DataList/index.js";
import { Redirect } from "react-router-dom";

const API_KEY = "3NtYGmPa4VJ9HPnh6KHgNqcmzfajuIw5ZgjviIPt5Cg";

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

const Search = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [fetchedPhotos, setFetchedPhotos] = useState([]);

  const handleDataList = async () => {
    try {
      const request = await fetch(
        `https://api.unsplash.com/search/collections?query=${inputValue}&client_id=${API_KEY}`
      );
      const response = await request.json();
      const resultsArray = response.results;
      let collection = [];
      collection = removeDuplicatesFromArray(resultsArray);
      setDataList(collection);
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
      console.log(response.results);
      setFetchedPhotos(response.results);
      setShouldRedirect(true);
    } catch (err) {
      console.log(err);
      setShouldRedirect(false);
    }
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (inputValue.length > 2) {
        handleDataList();
      } else {
        return;
      }
    }, 500);

    return () => clearTimeout(timeoutHandler);
  }, [inputValue]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(handleSearch)}>
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
          />
        </InputLabel>
        {inputValue.length > 2 && <DataListComponent list={dataList} />}
        {shouldRedirect && <Redirect push to='/photos' />}
      </Form>
    </Wrapper>
  );
};

export default Search;

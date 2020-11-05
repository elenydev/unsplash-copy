import React from "react";
import styled from "styled-components";

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

const DataList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column-reverse;
  font-size: 1em;
`;

const ListItem = styled.li`
  margin: 3px 0px;
  padding: 5px 8px;
  transition: 0.2s all;

  cursor: ${({ disabled }) => (disabled ? "normal" : "pointer")};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const DataListComponent = ({ list }) => {
  return (
    <Wrapper>
      <DataList>
        {list.length === 0 ? (
          <ListItem disabled={true}>No results...</ListItem>
        ) : (
          list.map((item) => <ListItem>{item}</ListItem>)
        )}
      </DataList>
    </Wrapper>
  );
};

export default DataListComponent;

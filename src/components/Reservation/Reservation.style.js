import styled from 'styled-components'

export const HList = styled.div`
  h3 {
    color: darkblue;
  }
  div {
    border: 2px solid black;
    padding: 3%;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0); 
    transition: box-shadow 0.5s;
    margin-right: 2%;
  }

  div:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  }
`

export const HListPage = styled.section`
  /* width: 100%;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 5% 0; */
  width: 100%;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5% 0;

  & > * {
    margin-left: 5px;
  }

  & > *:first-child {
    margin-left: 0;
  }

  & > * {
    margin-right: 5px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;
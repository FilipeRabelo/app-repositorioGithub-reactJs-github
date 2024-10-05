import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #eee;
  border-radius:4px;
  box-shadow: 0 0 20pc rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  box-shadow: 0 0 15px rgba(255, 7, 58, 1);

  @media (max-width: 750px) {
    max-width: 90%;
  }
`;

export const Owner = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  img{
    width: 150px;
    margin: 20px 0;
    border-radius: 20%;
  }

  h1{
    font-size: 30px;
    color: #0d2636;
  }

  p{
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    mar-width: 400px;
    font-weight: bold;
  }
`;


export const BackButton = styled(Link)`
  border: none;
  outline: 0;
  background-color: transparent;
  padding-top: 16px;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #DC143C;
  list-style: none;

  li{
    display: flex;
    padding: 15px 10px;

    & + li{
      margin-top: 12px;
    }

    img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #DC143C;
      box-shadow: 0 0 5px #DC143C;      
    }

    div{
      flex:1;
      margin-left: 12px;
    }

    strong{
      font-size:  15px;

      a{
        text-decoration: none;
        color: #222;
        transition: 0.3s;

        &:hover{
          color: #6611a7;
        }
      }
    }
  }

`;
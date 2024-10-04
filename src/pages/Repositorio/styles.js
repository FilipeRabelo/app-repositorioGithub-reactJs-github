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
  background-color: #FFF;
  border-radius:4px;
  box-shadow: 0 0 20pc rgba(0, 0, 0, 0.2);
  padding: 0 30px;
  margin: 80px auto;
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
  }
`;


export const BackButton = styled.button`
  border: none;
  background-color: transparent;
  padding-top: 16px;
`;
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-transform: capitalize;
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #eee;
  border-radius:4px;
  box-shadow: 0 0 20pc rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(255, 7, 58, 1);

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
  // border-top: 1px solid #DC143C;
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

      p{
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong{
      font-size:  15px;

      a{
      display: block;
        text-decoration: none;
        color: #222;
        transition: 0.2s;

        &:hover{
          color: #6611a7;
        }
      }

      span{
        display: inline-block;
        background-color: #6F42C1;
        color: #FFF;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin-top: 10px;

        & + span{
          margin-left: 10px;
        }
      }

    }

  }
`;

export const PageActions = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  border-top: 1px solid #DC143C;

  button:disabled{
    cursor: not-allowed;
    opacity: 0.5;
    height: 30px;
  }

  .btnVoltar{
    margin-top: 24px;
    height: 30px;
    outline: 0;
    border: 0;
    background-color: #DC143C;
    color: #000;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    // transition: all 0.8s;
  }

  .btnProximo{
    margin-top: 24px;
    height: 30px;
    outline: 0;
    border: 0;
    background-color: #39FF14;
    color: #000;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    // transition: all 0.8s;
  }

  // button:hover{
  //   transform: scale(1.1);
  // }
`;

export const FilterList = styled.div`

  border-top: 1px solid #DC143C;
  padding-top: 16px;

  margin: 15px 0;
  button{
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;
    background-color: #6F42C1;
    color: #000;
    opacity: 80%;

    &:nth-child(${props => props.active + 1}){
      background-color: #DC143C;
      color: #FFF;
      opacity: 100%;
    }
  }
`;
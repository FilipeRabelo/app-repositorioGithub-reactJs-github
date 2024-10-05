import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
  100% {
    box-shadow: 0 0 40px rgba(138, 43, 226, 0.9); /* Brilho aumentado */
  }
`;

export const Head = styled.header`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  // margin-bottom: 16px;
  padding: 16px;
  background-color: #6f42c1;
  color: #FFF;
  box-shadow: 0 0 15px rgba(138, 43, 226, 1);
  // animation: ${ pulse } 1.5s infinite alternate; 


  .divLink {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    font-weight: bold;
  }

  .linkTo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    color: #FFF;
    font-weight: bold;
    text-decoration: none;
    align-items: center;
    font-size: 14;
    transition: all 1s;

    // &:hover {
    //   transform: scale(1.2);
    //   color: #DC143C;
    // }
  }
`;

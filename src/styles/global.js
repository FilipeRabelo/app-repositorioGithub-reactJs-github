import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    text-transform: capitalize;
  }

  html, body, #root{
    min-height: 100%;
  }

  body{
    background-color: #101026;
    // background-color: #000;
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
    text-transform: capitalize;
  }

  body, input, button{
    color: #222;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  button{
    cursor: pointer;
  }

  @media (max-width: 600px) {
    input,
    textarea,
    select {
    font-size: 16px; /* Ajuste o tamanho da fonte */
    -webkit-text-size-adjust: 100%; /* Impede o ajuste de tamanho do texto no iOS */
  }

  li {
    list-style: none; !important
  }
`;



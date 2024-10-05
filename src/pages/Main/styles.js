import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
  100% {
    box-shadow: 0 0 40px rgba(138, 43, 226, 0.9); /* Brilho aumentado */
  }
`;

export const Container = styled.div`
  
  max-width: 700px;
  background-color: #eee;
  border-radius: 6px;
  padding: 30px;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(255, 7, 58, 1);
  // animation: ${ pulse } 1s infinite alternate;
  border: 1px solid rgba(0, 0, 0, 0.2);

  h1{
    padding: 0 5px;
    color: #DC143C;
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    svg{
      align-items: flex-end;
      justify-content: flex-end;
    }
  }

  @media (max-width: 550px) {
    max-width: 90%;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  

  input{
    flex: 1;           // para pegar toda a largura da tela
    // border: 1px solid ${ props => (props.error ? '#FF0000' : '#ddd') };
    border: 1px solid #DDD;
    padding: 10px 15px;
    border-radius: 4px;
    color: #000;
    // font-weight: bold;
    transition: all 0.8s;
    touch-action: manipulation;
    font-size: 16px;

    &:hover{
      background-color: #f5f5f5;
      border: 1px solid #6F42C1;
    }
  }
`;

// animação do button

const animate = keyframes`
  from {
    transform: rotate(0deg)
  }
  
  to{
    transform: rotate(360deg)
  }
`;

export const SubmitButton = styled.button.attrs(props => ({

  type: 'submit',
  disabled: props.loading

}))`
  background: #6F42C1;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s;

  &:hover{
    background-color: #f5f5f5;
  }


  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${ props => props.loading &&

    css`
      svg{      
        animation: ${ animate } 2s linear infinite;
      }
    `
  }
`;

export const List = styled.ul`
  list-style: nome; !important;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  

  li{
    border: 1px solid #aaa;
    border-radius: 4px;
    background-color: #fff;
    padding: 10px 5px 10px 0;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    marker: none;
    color: #000;
    text-transform: capitalize;
    font-size: 16px;

    & + li {
      margin-top: 1px solid #eee
    }

    a{
      color: #0D2636,
      font-weight: bold;
      text-decoration: none;
      padding-right: 5px;
      transition: all 0.5s;

      &:hover{
        transform: scale(1.2);
      }
    }

    span{
      font-weight: bold;
      text-transform: lowercase;
    }
  }
`;

export const DeleteButton = styled.button.attrs({

  type: 'button',

})`
  background-color: transparent;
  border: none;
  padding: 10px 7px 8px 7px; 
  outline: 0;
  border-radius: 4px;
  transition: all 0.5s;

  &:hover{
    transform: scale(1.2);
  }
`;


import React, { useState, useEffect, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import './styles.css';                                                           // modal styles
import { Link } from "react-router-dom";
import api from '../../services/api';

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <h2>Erro</h2> */ }
        <p className="message">{ message }</p>
        <button className="fechar" onClick={ onClose }>Fechar</button>
      </div>
    </div>
  );
};

const ModalExcluir = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="message">{ message }</p>
        <div className="modal-buttons">
          { onConfirm && (
            <button className="confirm" onClick={ onConfirm }>Sim</button>
          ) }
          <button className="cancel" onClick={ onClose }>Não</button>
        </div>
      </div>
    </div>
  );
};


export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Novo estado para o modal de confirmação
  const [errorMessage, setErrorMessage] = useState('');
  const [repoToDelete, setRepoToDelete] = useState(null); // Estado para armazenar o repositório a ser deletado

  const [newRepo, setNewRepo] = useState('');             // input q capta o q digita
  const [repositorios, setRepositorio] = useState([]);    // [] para armazenar todos os repositórios cadastrados
  const [loading, setLoading] = useState(false);          // estado para animação


  // DidMount - buscar
  useEffect(() => {     // buscar tudo do localStorage e colocar dentro de repositorios
    const repoStorage = localStorage.getItem('repos') // buscando dentro de repos

    if (repoStorage) { // se tem algo dentro coloco dentro de repositorios
      setRepositorio(JSON.parse(repoStorage)) // convertendo de volta para array
    }

  }, [])


  // DidUpdate - salvar alterações
  useEffect(() => {                                               //  buscar tudo q tem e salvar
    localStorage.setItem('repos', JSON.stringify(repositorios))   // transformar em string

  }, [repositorios])  // qndo a state repositorios sofre alteração ela executa esse useEffect



  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {          // função responsável por fazer a requisição

      setLoading(true);                // habilita o loading

      try {

        if (newRepo === '') {                                         // verificando se foi digitado algo
          setErrorMessage('Por favor, informe o Repositório Desejado.');     // modal
          setIsModalOpen(true);
          throw new Error('Por favor, informe o Repositório Desejado.');
        }


        const response = await api.get(`repos/${ newRepo }`)  // exemplo : https://api.github.com/repo/facebook/react

        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        console.log(hasRepo);


        if (hasRepo) {                                  // verificando se repo ja existe
          setErrorMessage('Este repositório já está Cadastrado.');
          setIsModalOpen(true);
          setNewRepo('');
          throw new Error('Este repositório já está Cadastrado.');     // se tem o repositorio vou barrar
        }


        const data = {                              // pega o q foi digitado   // desconstrução
          name: response.data.full_name,            // colocando dentro objeto para poder colocar mais depois
        }


        setRepositorio([...repositorios, data]);    // pega tudo q tem e adiciona o data, novo cadastro
        setNewRepo('');                             // para limpar o input


      } catch (error) {
        console.log(error);


        if (error.response && error.response.status === 404) {  // Verifica se o erro é de repositório não encontrado
          setErrorMessage('Repositório NÂO existe no GitHub');
          setNewRepo('');
        }

        // if (error.response.status === 403) {  // Verifica se o erro é de repositório não encontrado
        //   setErrorMessage('Requisicao negada! Limite Api Atingido!');
        //   setNewRepo('');
        // }

        setIsModalOpen(true);


      } finally {
        setLoading(false);                          // finaliza o loading
      }
    }

    submit();

  }, [newRepo, repositorios]);         // qndo uma ou a outra state for atualizada ele chama o useCallback



  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }




  const handleDelete = useCallback((repo) => {
    setRepoToDelete(repo); // Armazena o repositório a ser deletado
    setErrorMessage('Deseja realmente deletar este repositório?');
    setIsConfirmModalOpen(true); // Abre o modal de confirmação
  }, []);

  // Função para confirmar a deleção
  const confirmDelete = useCallback(() => {
    const encontrar = repositorios.filter(r => r.name !== repoToDelete); // Remove o repositório
    setRepositorio(encontrar);
    setIsConfirmModalOpen(false); // Fecha o modal de confirmação
    setErrorMessage('Repositório Deletado!'); // Mensagem de sucesso
    setIsModalOpen(true); // Abre o modal de sucesso
  }, [repositorios, repoToDelete]);

  // MODAL DE DIGITAR REPOSITORIO
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setRepoToDelete(null); // Limpa o repositório armazenado
  };




  return (
    <Container>
      <h1>
        Repositórios Favoritos
        <FaGithub size={ 40 } />
      </h1>

      <Form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={ newRepo }
          onChange={ handleInputChange }
        />

        <SubmitButton loading={ loading ? 1 : 0 }>
          {
            loading ? (
              <FaSpinner size={ 14 } color="#DC143C" />
            ) : (
              <FaPlus color="#DC143C" size={ 14 } />
            )
          }
        </SubmitButton>

      </Form>

      <List>
        { repositorios.map(repo => (
          <li key={ repo.name }>

            <span>
              <DeleteButton onClick={ () => handleDelete(repo.name) }>
                <FaTrash size={ 12 } color="#DC143C" />
              </DeleteButton>
              { repo.name }
            </span>

            <Link to={ `/repositorio/${ encodeURIComponent(repo.name)}`}>   
              <FaBars size={ 20 } color="#6F42C1" />
            </Link>

          </li>
        )) }
      </List>

      <Modal isOpen={ isModalOpen } onClose={ closeModal } message={ errorMessage } />

      <ModalExcluir
        isOpen={ isConfirmModalOpen }
        onClose={ closeConfirmModal }
        message={ errorMessage }
        onConfirm={ confirmDelete } // Passa a função de confirmação
      />
    </Container>

  )
}

//encodeURIComponent(repo.name) para retirar a barra / entre os parâmetros da URL

















// import React, { useState, useCallback, useEffect } from 'react';
// import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
// import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

// import api from '../../services/api';

// export default function Main() {

//   const [newRepo, setNewRepo] = useState('');
//   const [repositorios, setRepositorios] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState(null);

//   // Buscar
//   useEffect(() => {
//     const repoStorage = localStorage.getItem('repos');

//     if (repoStorage) {
//       setRepositorios(JSON.parse(repoStorage));
//     }

//   }, []);


//   // Salvar alterações
//   useEffect(() => {
//     localStorage.setItem('repos', JSON.stringify(repositorios));
//   }, [repositorios]);

//   const handleSubmit = useCallback((e) => {
//     e.preventDefault();

//     async function submit() {
//       setLoading(true);
//       setAlert(null);
//       try {

//         if (newRepo === '') {
//           throw new Error('Você precisa indicar um repositorio!');
//         }

//         const response = await api.get(`repos/${ newRepo }`);

//         const hasRepo = repositorios.find(repo => repo.name === newRepo);

//         if (hasRepo) {
//           throw new Error('Repositorio Duplicado');
//         }

//         const data = {
//           name: response.data.full_name,
//         }

//         setRepositorios([...repositorios, data]);
//         setNewRepo('');
//       } catch (error) {
//         setAlert(true);
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }

//     }

//     submit();

//   }, [newRepo, repositorios]);

//   function handleinputChange(e) {
//     setNewRepo(e.target.value);
//     setAlert(null);
//   }

//   const handleDelete = useCallback((repo) => {
//     const find = repositorios.filter(r => r.name !== repo);
//     setRepositorios(find);
//   }, [repositorios]);


//   return (
//     <Container>

//       <h1>
//         <FaGithub size={ 25 } />
//         Meus Repositorios
//       </h1>

//       <Form onSubmit={ handleSubmit } error={ alert }>
//         <input
//           type="text"
//           placeholder="Adicionar Repositorios"
//           value={ newRepo }
//           onChange={ handleinputChange }
//         />

//         <SubmitButton loading={ loading ? 1 : 0 }>
//           { loading ? (
//             <FaSpinner color="#FFF" size={ 14 } />
//           ) : (
//             <FaPlus color="#FFF" size={ 14 } />
//           ) }
//         </SubmitButton>

//       </Form>

//       <List>
//         { repositorios.map(repo => (
//           <li key={ repo.name }>
//             <span>
//               <DeleteButton onClick={ () => handleDelete(repo.name) }>
//                 <FaTrash size={ 14 } />
//               </DeleteButton>
//               { repo.name }
//             </span>
//             <a href="">
//               <FaBars size={ 20 } />
//             </a>
//           </li>
//         )) }
//       </List>

//     </Container>
//   )
// }
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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Novo estado para o modal de confirmação
  // const [errorMessage, setErrorMessage] = useState('');
  // const [repoToDelete, setRepoToDelete] = useState(null); // Estado para armazenar o repositório a ser deletado

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Modal de confirmação
  const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro
  const [confirmMessage, setConfirmMessage] = useState(''); // Mensagem de confirmação de exclusão
  const [repoToDelete, setRepoToDelete] = useState(null); // Repositório a ser deletado


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
          setErrorMessage('Informe o Repositório Desejado.');     // modal
          setIsModalOpen(true);
          throw new Error('Informe o Repositório Desejado.');
        }


        const response = await api.get(`repos/${ newRepo }`)  // exemplo : https://api.github.com/repo/facebook/react

        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        console.log(hasRepo);


        if (hasRepo) {                                  // verificando se repo ja existe
          setErrorMessage('Repositório já está Cadastrado.');
          setIsModalOpen(true);
          setNewRepo('');
          throw new Error('Repositório já está Cadastrado.');     // se tem o repositorio vou barrar
        }


        const data = {                              // pega o q foi digitado   // desconstrução
          name: response.data.full_name,            // colocando dentro objeto para poder colocar mais depois
        }


        setRepositorio([...repositorios, data]);    // pega tudo q tem e adiciona o data, novo cadastro
        setNewRepo('');                             // para limpar o input

      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 404) {
          setErrorMessage('Repositório não existe no GitHub');
          setNewRepo('');
        } 


        try {
          // Verificar o limite de requisições
          const rateLimit = await api.get('/rate_limit');
          console.log('Limite de requisições:', rateLimit.data);

          if (rateLimit.data.resources.core.remaining === 0) {
            setErrorMessage('Limite de requisições atingido');
            setNewRepo('');
          }

        } catch (rateError) {
          console.error('Erro ao verificar o limite de requisições:', rateError);
        }

        setIsModalOpen(true);

      } finally {
        setLoading(false); // Finaliza o loading
      }

      // } catch (error) {
      //   console.log(error);


      //   if (error.response && error.response.status === 404) {  // Verifica se o erro é de repositório não encontrado
      //     setErrorMessage('Repositório não existe no GitHub');
      //     setNewRepo('');
      //   } else if (error.response && error.response.status === 403) {          
      //     setErrorMessage('Limite de requisições atingido');
      //     setNewRepo('');
      //   }



      //   // Verificar o limite de requisições
      //   // const rateLimit = await api.get('/rate_limit');
      //   // if (rateLimit){
      //   //   console.log('Limite de requisições:', rateLimit.data);
      //   //   setErrorMessage('Limite de requisições atingido');
      //   //   setNewRepo('');
      //   // }

      //   // Verificar o limite de requisições
      //   const rateLimit = await api.get('/rate_limit');
      //   console.log('Limite de requisições:', rateLimit.data);

      //   setIsModalOpen(true);

      // } finally {
      //   setLoading(false);                          // finaliza o loading
      // }
    }

    submit();

  }, [newRepo, repositorios]);         // qndo uma ou a outra state for atualizada ele chama o useCallback



  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }




  // const handleDelete = useCallback((repo) => {
  //   setRepoToDelete(repo); // Armazena o repositório a ser deletado
  //   setErrorMessage('Deseja deletar este repositório?');
  //   setIsConfirmModalOpen(true); // Abre o modal de confirmação
  // }, []);

  const handleDelete = useCallback((repo) => {
    setRepoToDelete(repo);
    setConfirmMessage('Deseja deletar este repositório?'); // Usa um estado diferente para a mensagem de confirmação
    setIsConfirmModalOpen(true);
  }, []);

  // Função para confirmar a deleção
  // const confirmDelete = useCallback(() => {
  //   const encontrar = repositorios.filter(r => r.name !== repoToDelete); // Remove o repositório
  //   setRepositorio(encontrar);
  //   setIsConfirmModalOpen(false); // Fecha o modal de confirmação
  //   setErrorMessage('Repositório Deletado!'); // Mensagem de sucesso
  //   setIsModalOpen(true); // Abre o modal de sucesso
  // }, [repositorios, repoToDelete]);

  // Função para confirmar a deleção
  const confirmDelete = useCallback(() => {
    const filteredRepos = repositorios.filter(r => r.name !== repoToDelete);
    setRepositorio(filteredRepos);
    setIsConfirmModalOpen(false);
    setConfirmMessage(''); // Limpa a mensagem de confirmação após a deleção
    setErrorMessage('Repositório Deletado!'); // Usa o estado de erro para exibir o sucesso
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
                <FaTrash size={ 18 } color="#DC143C" />
              </DeleteButton>
              { repo.name }
            </span>

            <Link to={ `/repositorio/${ encodeURIComponent(repo.name) }` }>
              <FaBars size={ 20 } color="#6F42C1" />
            </Link>

          </li>
        )) }
      </List>

      <Modal isOpen={ isModalOpen } onClose={ closeModal } message={ errorMessage } />

      <ModalExcluir
        isOpen={ isConfirmModalOpen }
        onClose={ closeConfirmModal }
        message={ confirmMessage }
        onConfirm={ confirmDelete } // Passa a função de confirmação
      />
    </Container>

  )
}

//encodeURIComponent(repo.name) para retirar a barra / entre os parâmetros da URL
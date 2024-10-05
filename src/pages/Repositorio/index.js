import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';               // useParams para obter os parâmetros da rota
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();                      // Pegando o parâmetro da rota (nome do repositório)

  const [repositorioData, setRepositorioData] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);                      // paginação - começa na pagina 1

  const [filters, setFilters] = useState([                  // array de objetos
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Abertas', active: false },
    { state: 'closed', label: 'Fechadas', active: false },
  ]);

  const [filterIndex, setFilterIndex] = useState(0);


  useEffect(() => {                                         // buscando as info da pagina    
    async function load() {

      const nomeRepo = decodeURIComponent(repositorio);     // importante - repositorio

      try {
        const [repositorioData, issuesData] = await Promise.all([

          api.get(`/repos/${ nomeRepo }`),                  // indo na requisição do repositorio e get nas info
          api.get(`/repos/${ nomeRepo }/issues`, {
            params: {
              state: filters.find(f => f.active).state,     // vai colocar all
              per_page: 5,
            },
          }),
        ]);

        setRepositorioData(repositorioData.data);
        setIssues(issuesData.data);

      } catch (error) {
        console.error('Erro ao carregar os dados', error);

        // Verificar o limite de requisições
        const rateLimit = await api.get('/rate_limit');
        console.log('Limite de requisições:', rateLimit.data);

      } finally {
        setLoading(false);
      }
    }

    load();
  }, [repositorio]);


  // paginação

  useEffect(() => {                                // para renderizar a lista e mudar de pagina                                            
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(repositorio);

      const response = await api.get(`/repos/${ nomeRepo }/issues`, {
        params: {
          state: filters[filterIndex].state,    // filters[0].state
          page,
          per_page: 5
        },
      });

      setIssues(response.data);                     // atualizando a state
    }

    loadIssue();
  }, [filterIndex, filters, repositorio, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }


  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to={ '/' }>
        <FaArrowLeft color='#DC143C' size={ 35 } />
      </BackButton>

      <Owner>
        <img
          src={ repositorioData.owner.avatar_url }
          alt={ repositorioData.owner.login }
        />
        <h1>{ repositorioData.name }</h1>
        <p>{ repositorioData.description }</p>
      </Owner>

      <FilterList active={ filterIndex }>
        { filters.map((filter, index) => (

          <button
            type='button'
            key={ filter.label }
            onClick={ () => handleFilter(index) }
          >
            { filter.label }
          </button>

        )) }
      </FilterList>

      <IssuesList>
        { issues.map(issue => (
          <li key={ String(issue.id) }>
            <img src={ issue.user.avatar_url } alt={ issue.user.login } />

            <div>
              <strong>
                <a href={ issue.html_url }>{ issue.title }</a>

                { issue.labels.map(label => (
                  <span key={ String(label.id) }>{ label.name }</span>
                )) }

              </strong>
              <p>Nome Usuário: <b>{ issue.user.login }</b></p>
            </div>

          </li>
        )) }
      </IssuesList>

      <PageActions>
        <button
          className='btnVoltar'
          type='button'
          onClick={ () => handlePage('back') }
          disabled={ page < 2 }
        >
          Voltar
        </button>

        <button
          className='btnProximo'
          type='button'
          onClick={ () => handlePage('next') }
        >
          Proximo
        </button>
      </PageActions>

    </Container>
  );
}

// a key do li precisa ser string, então transformo o id number em string
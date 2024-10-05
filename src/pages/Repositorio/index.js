import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';               // useParams para obter os parâmetros da rota
import { Container, Owner, Loading, BackButton, IssuesList } from './styles';
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api';

export default function Repositorio() {
  const { repositorio } = useParams();                      // Pegando o parâmetro da rota (nome do repositório)

  const [repositorioData, setRepositorioData] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {                                         // buscando as info da pagina    
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio);

      try {
        const [repositorioData, issuesData] = await Promise.all([

          api.get(`/repos/${ nomeRepo }`),                  // indo na requisicao do repositorio e get nas info
          api.get(`/repos/${ nomeRepo }/issues`, {
            params: {
              state: 'open',
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


  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to={'/'}>
        <FaArrowLeft color='#DC143C' size={35}/>
      </BackButton>

      <Owner>
        <img
          src={ repositorioData.owner.avatar_url }
          alt={ repositorioData.owner.login }
        />
        <h1>{ repositorioData.name }</h1>
        <p>{ repositorioData.description }</p>
      </Owner>

      <IssuesList>
        { issues.map(issue => (
          <li key={String(issue.id)}>  
            <img src={issue.user.avatar_url} alt={issue.user.login}/>

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}

              </strong>

              <p>Nome Usuario: <b>{ issue.user.login }</b></p>
            </div>

          </li>
        ))}
      </IssuesList>

    </Container>
  );
}

// a key do li precisa ser string, então transformo o id number em string
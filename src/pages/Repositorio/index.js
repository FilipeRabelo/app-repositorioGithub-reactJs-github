
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from './styles';

import api from '../../services/api';

export default function Repositorio() {

  const { repositorioUseParams } = useParams();

  const [repositorio, setRepositorio] = useState({});   // vai ser objeto pq é somente um por vez
  const [issues, setIssues] = useState([])              // array vazio pq é mais de um

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      // Verificar o limite de requisições
      const rateLimit = await api.get('/rate_limit');
      console.log('Limite de requisições:', rateLimit.data);

      const nomeRepo = repositorioUseParams;   // const {repositorioUseParams} = useParams(); - useParams

      const [repositorioData, issuesData] = await Promise.all([  // um array de promise para executar as 2 requisições ao mesmo tempo
        api.get(`/repos/${ nomeRepo }`),                         // repositorio com os dados do repositorio
        api.get(`/repos/${ nomeRepo }/issues`, {                 // devolve tudo dentro de um array
          params:{
            state: 'open',
            per_page: 5
          }
        })                    
      ]);

      setRepositorio(repositorioData);      // passando para os estados
      setIssues(issuesData);

      setLoading(false);

      // console.log(repositorioData.data);
      // console.log(issuesData.data);
    }

    load();

  }, [repositorioUseParams]);




  return (
    <Container>

    </Container>
  )
};

// { repositorioUseParams }

// const response = await api.get(`/repos/${nomeRepo`});
// const issues = await api.get(`/repos/${nomeRepo}/issues`);

// Verificar o limite de requisições
// const rateLimit = await api.get('/rate_limit');
// console.log('Limite de requisições:', rateLimit.data);
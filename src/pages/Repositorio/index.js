



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';               // useParams para obter os parâmetros da rota
import { Container, Owner, Loading, BackButton } from './styles';
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
        // console.log(repositorioData.data);
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

    </Container>
  );
}


















// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container } from './styles';
// import api from '../../services/api';

// export default function Repositorio() {
//   const { repositorioUseParams } = useParams();

//   const [repositorio, setRepositorio] = useState({});   // vai ser objeto pq é somente um por vez
//   const [issues, setIssues] = useState([])              // array vazio pq é mais de um
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {                 // para buscar todas as informações

//     async function load() {
//       const nomeRepo = repositorioUseParams;   // const {repositorioUseParams} = useParams(); - useParams

//       const [repositorioData, issuesData] = await Promise.all([  // um array de promise para executar as 2 requisições ao mesmo tempo
//         api.get(`/repos/${ nomeRepo }`),                         // repositorio com os dados do repositorio
//         api.get(`/repos/${ nomeRepo }/issues`, {                 // devolve tudo dentro de um array
//           params:{
//             state: 'open',
//             per_page: 5
//           }
//         })                    
//       ]);

//       setRepositorio(repositorioData);      // passando para os estados
//       setIssues(issuesData);

//       setLoading(false);

//       // console.log(repositorioData.data);
//       // console.log(issuesData.data);
//     }

//     load();

//   }, [repositorioUseParams]);




//   return (
//     <Container>

//     </Container>
//   )
// };

// // { repositorioUseParams }

// // const response = await api.get(`/repos/${nomeRepo`});
// // const issues = await api.get(`/repos/${nomeRepo}/issues`);

// // Verificar o limite de requisições
// // const rateLimit = await api.get('/rate_limit');
// // console.log('Limite de requisições:', rateLimit.data);
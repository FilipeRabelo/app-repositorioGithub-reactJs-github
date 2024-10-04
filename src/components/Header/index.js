
import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from './styles';

import { FaGithub } from 'react-icons/fa'

export default function Header() {
  return (
    <Head>
      {/* <h2>Repos Favoritos</h2> */ }

      <div>
        <Link to={ '/' }>
          <FaGithub size={ 45 } color='#DC143C' />
        </Link><br />
      </div>

      <div className='divLink'>
        <Link className="linkTo" to={ '/' }>Home</Link><br />
        <Link className="linkTo" to={ '/repositorio/:repositorio' }>Repositorios</Link><br />
        {/* <FaGithub size={ 45 } color='#DC143C'/> */ }
      </div>

    
    </Head>
  )
}
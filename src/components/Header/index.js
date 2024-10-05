import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from './styles';
import { FaGithub } from 'react-icons/fa'

export default function Header() {
  return (
    <Head>
      <div>
        <Link to={ '/' }>
          <FaGithub size={ 45 } color='#DC143C' />
        </Link><br />
      </div>

      <div className='divLink'>
        <Link className="linkTo" to={ '/' }><h2>GitHub Repos </h2></Link><br />
      </div>
    </Head>
  )
}
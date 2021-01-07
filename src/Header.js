import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <header>
            <Link to='/' style={{textDecoration:'none'}}><h1>Noteful</h1></Link>
        </header>
    );
}
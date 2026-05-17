import React from "react";
import './Header.css';

export default ({black}) => {
    return (
       <header className={black ? 'black' : ''}>
         <div className="header--logo"> 
            <a href="/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Netflix-Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Netflix" />
            </a>
            </div>
            <div className="header--user">
                <a href="/">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" alt="Usuário" />
                </a>
            </div>
       </header>
    );
}
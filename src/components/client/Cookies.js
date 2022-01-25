import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Cookie = () => {
   const [name, setName] = useState('');
   const [cookies, setCookie] = useCookies();

   const handle = () => {
      setCookie('Name', name, { path: '/' });       // afak miacceder amin page "/" ilai cookie 
   };

   return (
    <div className="App">
        <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <div>
            <button onClick={handle}>Set Cookie</button>
        </div>
            {   
                cookies.Name && (
                    <div>
                        Name: <span>{cookies.Name}</span>
                    </div>
                )
            }
    </div>
 );
};

export default Cookie;
import * as React from 'react';

export default function Form(){
    return(
        <div>
            <h1>Bienvenido</h1>
            <p>Elcome back! Please enter your details</p>
            <div>
                <div>
                    <label>Email</label>
                    <input 
                        className=''
                        placeholder='Enter your email'
                        />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        className=''
                        placeholder='Enter your password'
                        type="password"
                        />
                </div>
                <div>
                    <div>
                        <input
                            type="checkbox"
                            id='remember'
                        />
                        <label for='remember'>Remember for 30 days </label>
                    </div>
                </div>    
                        
                    
                
            </div>
        </div>
        
        

    )
}
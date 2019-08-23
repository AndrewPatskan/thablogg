import React from 'react';
import {Link} from 'react-router-dom';

const ErrorHandler = ({error})=>{
        return  <div>{ 
                    (error==='Network Error') ?
                        (<div>Server or network problems. Check your connection or try again later</div>) :
                    (error==='Internal server or db error') ? 
                        (<div>Server or network problems. Check your connection or try again later</div>) :
                    (error==='Forbidden' || error==='Not authorized') ?
                        (<div>
                            <h1>Please sign in or register</h1>
                            <Link to='/signin'>sign in</Link>
                        </div>) :
                    (error==='Wrong password' || error==='Email is not registered') ?
                        (<div>Wrong email or password... try again</div>) :
                    (error==='Email validation failed!') ?
                        (<div>this email is already exists</div>) :
                    (error==='Not enought params') ?
                        (<div>Every field must be filled</div>) :
                    (<div></div>)
                }
                </div>
    
};
export default ErrorHandler;
import React, { useState } from 'react';
import alert from './../../assets/exclamation-triangle.svg';
import './Warning.css'

export default function Warning(props) {

    const [clicked, setClicked] = useState(false);

    return (
        <div hidden={props.hidden} className={clicked ? "wr-outer wr-outer-anim" : "wr-outer"}>
            <div className="wr-row">
                <img src={alert} alt="A triangle with an exclamation mark" width="50px"/>
                {props.lineOne ? 
                    <h5 className="wr-row">{props.lineOne} </h5> 
                : 
                    <h5 className="wr-row">Oops something went wrong!</h5>
                }
                
                {props.lineTwo ? 
                    <h6 className="wr-row">{props.lineTwo} </h6> 
                : 
                    <h6 className="wr-row">Please try again later.</h6>
                }
            </div>
            
            <button disabled={clicked} className="wr-dismiss" onClick={() => {
                // Callback runs after the 3 sec fade animation stops
                setClicked(true);
                setTimeout(props.onClick, 3000);
            }}> 
                <b>Dismiss</b> 
            </button>
        </div>
    );
}
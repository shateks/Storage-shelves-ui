import React from 'react'
import {empties} from './Shelves'

class Table extends React.Component{

    render(){
        const shelves = this.props.something;

        let list = Object.keys(shelves).map((k,i) => {
            if (empties.includes(k)){
                console.log("empty ",k);
            }
            else{
                return <li key={i}><div>{shelves[k].Name}</div><div>{shelves[k].Serial}</div></li>;
            }
        });
                
        return (

            <div>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default Table
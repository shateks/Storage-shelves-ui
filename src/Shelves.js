import React from 'react'
import Cylinder from './Cylinder'
import pustyImg from './pusty.bmp'

class Shelves extends React.Component{
    constructor(props){
        super(props);
        this.state={
                shelves_store: this.empty_shelves_constructor()
            };
    }

    empty_shelves_constructor()
    {
        let rangeOfShelves = Array.from(Array(37).keys());
        let obj = {};
        rangeOfShelves.forEach(i => {
            obj[i] = {
                Fresh: false,
                Cleaned: false,
                Occupied: false
            }
        });
        return obj;
    }

    componentDidMount() {
        fetch('http://localhost:8000/api')
            .then(
                response => { return response.json() }
            )
            .then(
                data => {
                    let parsed = JSON.parse(data);
                    let received_shelves = {};
                    parsed.forEach((val) =>{
                        received_shelves[val.Name] = val;
                    });
                    let prev_shelves_store = this.state.shelves_store;
                    for (var i = 0; i <= 36; i+=1)
                    {
                        if (received_shelves[i] !== undefined){
                            prev_shelves_store[i].Fresh = received_shelves[i].Fresh;
                            prev_shelves_store[i].Cleaned = received_shelves[i].Cleaned;
                            prev_shelves_store[i].Occupied = received_shelves[i].Occupied;
                        }
                    }  
                    this.setState({shelves_store: prev_shelves_store});          
            }, 
                error => { console.log("Błąd:" + error) }
            )
    }

    shelfGenerator(i){
        const empties = [2,17,19];
        let storage = this.state.shelves_store;
        if (empties.includes(i)){
            return <div className='Cylinder'></div>
        }
        else{
            return <Cylinder    className={(i % 2 === 0) ? 'Cylinder' : 'Cylinder_right'}
                                description={(i).toString()}
                                name={i}
                                fresh={storage[i].Fresh}
                                cleaned={storage[i].Cleaned}
                                occupied={storage[i].Occupied}
                />
        }
    }

    render() {
        let grid = [];
        for (var i = 36; i > 1; i-=2) {
            grid.push(this.shelfGenerator(i));
            grid.push(<img src={pustyImg} className='CylinderSpaceBetween'/>);
            grid.push(this.shelfGenerator(i-1));
        }
        return (
            <div className='container'>
                {grid}
            </div>
        );
    }
}

export default Shelves



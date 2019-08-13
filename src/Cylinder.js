import React from 'react'
import freshImg from './druk.bmp'
import dirtyImg from './brudny.bmp'
import emptyImg from './pusty.bmp'
import washedImg from './umyty.bmp'

const images = [freshImg,dirtyImg,emptyImg,washedImg]

class Cylinder extends React.Component{
    // constructor(props){
    //     super(props)
    //     // this.handleClick = this.handleClick.bind(this)
    //     // this.imageSwitcher = this.imageSwitcher.bind(this)
    //     // this.tick = this.tick.bind(this)
    //     // this.state = {
    //     //     count: 0,
    //     //     image: emptyImg,
    //     //     fresh: false,
    //     //     cleaned: false,
    //     //     occupied: false
    //     // }
    // }

    imageSwitcher()
    {
        if (this.props.occupied === true)
        {
            if (this.props.fresh === true)
            {
                return freshImg;
            }
            else if (this.props.cleaned === true){
                return washedImg;
            }
            else{
                return dirtyImg;
            }
        }
        return emptyImg;
    }

    handleClick(){
        // let {count} = this.state
        // count += 1
        // if (count >= images.length){
        //     count = 0
        // }
        // this.setState({
        //     count: count,
        //     image: images[count]
        // })
        if(this.state.occupied===false){
            this.setState({
                fresh: false,
                cleaned: false,
                occupied: true
            })

        }else{
            
            if(this.state.fresh === false & this.state.cleaned === false){
                this.setState({
                    fresh: false,
                    cleaned: true,
                })
            }else if(this.state.cleaned === true){
                this.setState({
                    fresh: true,
                    cleaned: false,
                })
            }else if(this.state.fresh === true){
                this.setState({
                    fresh: false,
                    cleaned: false,
                    occupied: false
                })
            }
        } 
        // console.log('+')
    }

    tick(){
        this.handleClick()
        
    }

    // componentDidMount(){
    //     this.timer = setInterval(this.tick, 4000);
    // }

    render(){
        // let reverse = this.props.reverse !== undefined ? 'flex-row-reverse' : '';
        // let Fresh = this.props.Fresh;
        // let Cleaned = this.props.Cleaned;
        // let Occupied = this.props.Occupied;
        let image;

        // if(Occupied)
        // {
        //     if (Cleaned) {
        //         image = <img src={this.imageSwitcher()} className='CylinderPicto'/>;
        //     }
        //     else if (Fresh) {
        //         image = <img src={this.imageSwitcher()} className='CylinderPicto'/>;
        //     }
        //     else {
        //             image = <img src={this.imageSwitcher()} className='CylinderPicto'></img>;
        //     }
        // }
        // else{
        //     image = <img src={this.imageSwitcher()} className='CylinderPicto'></img>;
        // }
        
        return(            
        <div className={this.props.className}>
            
            <div className='CylinderNumber'>
                {this.props.description}
                {/* {this.props.name} */}
            </div>

            <img src={this.imageSwitcher()} className='CylinderPicto'/>
            
        </div>
        );
    }
}

export default Cylinder
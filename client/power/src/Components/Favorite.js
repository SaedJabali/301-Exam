import axios from 'axios';
import React, { Component } from 'react'

export class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myFave: [],
            newFaveData: [],
        }
    }
    componentDidMount = () => {
        this.getMyFavData();
    }
    getMyFavData = async () => {
        const favData = await axios.get(`${process.env.REACT_APP_SERVER}/favorite`)
        this.setState({
            myFave: favData.data
        })
    }

    deleteMyData = async (index) => {
        const newFaveArr = await axios.delete(`${process.env.REACT_APP_SERVER}/favorite/${index}`)
        console.log(index)
        this.setState({
            newFaveData: newFaveArr.data
        })
        window.location.reload()
    }

    render() {
        return (
            this.state.myFave.map((element, idx) => {
                return (
                    <div>
                        <h2>
                            {element.name}
                        </h2>
                        <p>
                            {element.gender}
                        </p>
                        <img src={element.img} alt='' />
                        {/* <p>
                                {element.powers}
                            </p> */}
                            <br/>
                        <button onClick={e => { this.deleteMyData(element.name) }}>
                            Delete form favorite
                            </button>
                    </div>

                )
            })
        )
    }
}

export default Favorite

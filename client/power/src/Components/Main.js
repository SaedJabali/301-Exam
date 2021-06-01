import React from 'react'
import axios from 'axios'

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
        }
    }

    componentDidMount = () => {
        this.getData();
    }
    getData = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/get-characters`
            const charData = await axios.get(url);

            console.log(charData.data);
            this.setState({
                apiData: charData.data,
            })
        } catch (error) {
            console.log(error);
        }
    }

    postData = async (dataObj) => {
     try{
        const postArr = await axios.post(`${process.env.REACT_APP_SERVER}/favorite`, dataObj)
        console.log(postArr.data);
        
     }catch(error){
         console.log(error)
     }
    }



    render() {
        return (
            <>
                { this.state.apiData.map((element, obj) => {
                    return (
                        <div>
                            <button onClick={(e) => { this.postData(element) }}>
                                Add to favorite
                            </button>
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

                        </div>
                    )
                })
                }
            </>
        )
    }
}

export default Main

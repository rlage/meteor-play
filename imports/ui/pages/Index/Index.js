import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import './Index.scss';

class Index extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    let self = this
    
    axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: "kLuLZJo74W562Tiz4OkYtT1I3cMM4pWG"
      }
    })
      .then(function (response) {
        self.setState(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    return(
      <div className="Index">
        {this.state.data ? 
        <img
          src={this.state.data.image_original_url}
          alt="Funny gif"
        /> : "Loading..."
        }
      </div>
    )
  }
};

export default Index;

import React from 'react';
import PropTypes from 'prop-types';

import './Stars.scss';

const Stars = ({ rating }) => {
  let array = []
  if(rating){
    array = [...Array(Number(rating)).keys()]
  } 
  
  return (
    <div className="Stars">
      {array.map(a => {
        return <img key={a} src="http://www.hotelnavegadores.com/img/naves/star_gold.png"/>
      })}      
    </div>
  )
};

Stars.propTypes = {
  rating: PropTypes.string.isRequired,
};

export default Stars;

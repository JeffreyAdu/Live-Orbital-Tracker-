import React from 'react';

const People = ({ name }) => {
    return (
      <div className='tc grow bg-near-black br3 pa3 ma2 dib bw2 shadow-5 white'>
        <img alt='nameofastronauts' src={`https://banner2.cleanpng.com/20180215/pve/kisspng-astronaut-cartoon-clip-art-cute-astronaut-cliparts-5a854ed394bb36.1938115515186859076092.jpg`} />
        <div>
          <h2>{name}</h2>
        </div>
      </div>
    );
  }


export default People;
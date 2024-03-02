import React from 'react';
import People from './People';

const PeopleList = ({ astronauts }) => { 
  return (
    <div className="astronaut-cards-container" >
      {astronauts.map((user, i) => ( 
        <People
          key={i}
          name={astronauts[i].name} 
        />
      ))}
    </div>
  );
};

export default PeopleList;



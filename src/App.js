import React, {useState,useEffect} from 'react';
import Pokemon from "./Pokemon"
import PokeDetails from './PokeDetails';
import detailsContext from './DetailsContext';

function App() {
  const [pokeList, setPokeList] = useState([])
  const [details, setDetails] = useState({});
  const contextValue = {details, setDetails};

  const woot = () => {
    return <h1>THIS IS A COMPONENT</h1>
  }

  let renderComponent;
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(res => res.json())
      .then(data =>{
        setPokeList(data.results);
      })
    }, []
  )

  if(Object.keys(details).length === 0){
    if(pokeList.length === 0){
      renderComponent = <h1>LOADING....</h1>
    }else{
      renderComponent = pokeList.map(pokemon => <Pokemon key={pokemon.name} notContextValue={pokemon}/>)
    }
  }else{
    renderComponent = <PokeDetails details={details}/>
  }

  return (
    <>
      <detailsContext.Provider value={contextValue}>
       {renderComponent}
       {/* more components */}
      </detailsContext.Provider>
      {/* other components */}
      <woot/>
    </>
  );

  
}

export default App;
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const GET_POKEMONS = gql`
 query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
    }
  }
`





const PokemanPage = () => {

    const {loading, error, data} = useQuery(GET_POKEMONS,
    {
        variables: {
            first: 10
        }
    });

    console.info(data);

    if(loading) return <h1>Loading Pokemon...</h1>
    if(error) return <h1>Error</h1>


    return(
        <>
            
             <h1>Pokemon List</h1>
            {
            (data && data.pokemons) ? (                
                <ul>
                    {data.pokemons.map(pokemon => <li key={pokemon.id}>{pokemon.name}</li>)}
                </ul>        
            )
            :
            (
                <p>No pokemon data</p>
            )
            }

        </>
    );
}

export default PokemanPage;


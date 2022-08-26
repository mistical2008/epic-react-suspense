// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

function createResource(promise) {
  let status = 'pending'

  let resource = promise
    .then(resolved => {
      status = 'success'
      resource = resolved
    })
    .catch(error => {
      status = 'rejected'
      resource = error
    })

  return {
    read: () => {
      if (status === 'pending') {
        throw resource
      }

      if (status === 'rejected') {
        throw resource
      }

      if (status === 'success') {
        return resource
      }
    },
  }
}

const resource = createResource(fetchPokemon('pikachu'))

function PokemonInfo() {
  const pokemon = resource.read()

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <PokemonErrorBoundary>
          <React.Suspense fallback="Loading...">
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App

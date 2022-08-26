// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

function createResource(promise) {
  let resourceData
  let resourceError

  const resultedPromise = promise
    .then(data => (resourceData = data))
    .catch(error => (resourceError = error))

  return {
    read: () => {
      if (resourceError) {
        throw resourceError
      }

      if (!resourceData) {
        throw resultedPromise
      }

      return resourceData
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

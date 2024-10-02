'use client'
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/fecthServices";
import Confetti from "@/components/confetti";
//import { toastSuccess } from "@/components/toaster";

export default function Home() {
  const [pokemon, setPokemon] = useState(null)
  const [lettersUsed, setLettersUsed] = useState([])
  const [errores, setErrores] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const cantidadMaximaDeErroresPermitidos = 6

  useEffect(() => {
    selectPokemon()
  }, [])

  useEffect(() => {
    verifyGameOver()
  }, [lettersUsed])

  const selectPokemon = () => {
    const cantidadPokemosPrimeraGeneracion = 151
    const idPokemon = Math.floor(Math.random() * (cantidadPokemosPrimeraGeneracion - 1 + 1)) + 1;

    fetchPokemons(idPokemon).then(
      (pokemosData) => {
        if(pokemosData?.name.includes("-") && pokemosData?.name != "mr-mime") {
          selectPokemon()
        } else {
          if(pokemosData?.name == "mr-mime") {
            pokemosData.name = pokemosData?.name.replaceAll("-", "")
          }
          setPokemon(pokemosData)
          setLettersUsed([])
          setErrores(0)
          setGameOver(false)
        }
      }
    ).catch((e) => {
      console.log("e", e)
    })
  }

  const verifyGameOver = () => {
    if (pokemon) {
      let currentName = ""
      for (const letterName of pokemon.name) {
        if (lettersUsed.includes(letterName)) {
          currentName = currentName + letterName
        }
      }
      if (currentName == pokemon.name) {
        setGameOver(true)
      }
    }
  }

  const splitPokemonName = () => {
    const letters = []
    for (const letter of pokemon.name) {
      letters.push(letter)
    }
    return letters
  }

  const handlerLettersUsed = (letter: string) => {
    if (!pokemon.name.includes(letter)) {
      const newErrores = errores + 1
      if (newErrores >= cantidadMaximaDeErroresPermitidos) {
        const letters = splitPokemonName()
        setLettersUsed((prevLetters) => [...prevLetters, ...letters]);
        setGameOver(true);
      }
      setErrores(newErrores)
    }

    setLettersUsed((prevLetters) => [...prevLetters, letter]);
  }

  const renderLetters = () => {
    const alphabetic = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return (
      <div className="w-1/2 grid grid-cols-6 gap-4 max-md:mt-5 max-md:flex max-md:flex-row max-md:flex-wrap max-md:w-full">
        {alphabetic.map((letter, index) => {
          return (
            <div
              key={"letter_" + index}
              className={lettersUsed.includes(letter) || gameOver ?
                "pokemon-text text-2xl cursor-default bg-blue-200 flex w-11 h-11 md:pb-3 justify-center items-center border-solid border-2 border-black md:m-5 rounded-full"
                :
                "pokemon-text text-2xl cursor-pointer fondo-letras flex w-11 h-11 md:pb-3 justify-center items-center border-solid border-2 border-black md:m-5 rounded-full"
              }
              onClick={lettersUsed.includes(letter) || gameOver ? null : () => handlerLettersUsed(letter)}
            >
              {letter.toLocaleUpperCase()}
            </div>
          )
        })
        }
      </div>
    )
  }

  const renderCantidadLetras = () => {
    const letters = splitPokemonName()

    return (
      <div className="w-full flex flex-row items-center justify-between p-10 max-md:p-1 mt-10">
        {letters.map((letter, index) => {
          return (
            lettersUsed.includes(letter) ? (
              <div
                key={"letter_" + index}
              >
                {letter.toLocaleUpperCase()}
              </div>
            ) : (
              <div
                key={"letter_" + index}
                className="w-4 border-b-4 border-black m-2">
              </div>

            )
          )
        })
        }
      </div>
    )
  }

  const renderButtonChangePokemon = () => {
    return (
      <button type='button'
        className='py-2.5 pl-4 group pr-3.5 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 flex gap-2 items-center hover:bg-indigo-700'
        onClick={selectPokemon}
      >
        <svg className="transition-all duration-700 md:group-hover:animate-spin"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none">
          <path
            d="M18.6793 11.776C18.6793 12.2186 19.0381 12.5774 19.4807 12.5774C19.9233 12.5774 20.2821 12.2186 20.2821 11.776H18.6793ZM3.75105 8.55933C3.58499 8.96958 3.78294 9.43677 4.19319 9.60283C4.60344 9.7689 5.07063 9.57095 5.23669 9.1607L3.75105 8.55933ZM5.3214 12.224C5.3214 11.7814 4.96261 11.4226 4.52003 11.4226C4.07744 11.4226 3.71866 11.7814 3.71866 12.224H5.3214ZM20.2497 15.4407C20.4157 15.0304 20.2178 14.5632 19.8075 14.3972C19.3973 14.2311 18.9301 14.4291 18.764 14.8393L20.2497 15.4407ZM19.5043 11.7988L19.0401 12.452C19.4009 12.7084 19.9012 12.6237 20.1575 12.2629L19.5043 11.7988ZM17.0297 9.0573C16.669 8.80094 16.1687 8.88558 15.9123 9.24636C15.656 9.60713 15.7406 10.1074 16.1014 10.3638L17.0297 9.0573ZM22.2457 9.32421C22.5021 8.96344 22.4175 8.46315 22.0567 8.20679C21.6959 7.95042 21.1956 8.03507 20.9393 8.39584L22.2457 9.32421ZM4.49642 12.2012L4.9606 11.548C4.59983 11.2916 4.09954 11.3763 3.84318 11.7371L4.49642 12.2012ZM6.97097 14.9427C7.33174 15.1991 7.83203 15.1144 8.08839 14.7536C8.34475 14.3929 8.26011 13.8926 7.89933 13.6362L6.97097 14.9427ZM1.75496 14.6758C1.4986 15.0366 1.58324 15.5369 1.94402 15.7932C2.30479 16.0496 2.80508 15.9649 3.06145 15.6042L1.75496 14.6758ZM11.7047 4.80137C15.5567 4.80137 18.6793 7.92403 18.6793 11.776H20.2821C20.2821 7.03886 16.4418 3.19863 11.7047 3.19863V4.80137ZM5.23669 9.1607C6.27196 6.60316 8.77885 4.80137 11.7047 4.80137V3.19863C8.10371 3.19863 5.02289 5.41737 3.75105 8.55933L5.23669 9.1607ZM12.2961 19.1986C8.44406 19.1986 5.3214 16.076 5.3214 12.224H3.71866C3.71866 16.9611 7.55889 20.8014 12.2961 20.8014V19.1986ZM18.764 14.8393C17.7288 17.3968 15.2219 19.1986 12.2961 19.1986V20.8014C15.897 20.8014 18.9778 18.5826 20.2497 15.4407L18.764 14.8393ZM19.9685 11.1455L17.0297 9.0573L16.1014 10.3638L19.0401 12.452L19.9685 11.1455ZM20.9393 8.39584L18.851 11.3346L20.1575 12.2629L22.2457 9.32421L20.9393 8.39584ZM4.03224 12.8545L6.97097 14.9427L7.89933 13.6362L4.9606 11.548L4.03224 12.8545ZM3.06145 15.6042L5.14966 12.6654L3.84318 11.7371L1.75496 14.6758L3.06145 15.6042Z"
            fill="currentcolor" />
        </svg>
      </button>
    )
  }

  return (
    pokemon && (
      <div className="flex flex-col justify-center items-center max-md:p-3">
        <h1 className="pokemon-text text-6xl max-md:text-3xl md:mt-20">¿ Quien es ese Pokémon ?</h1>
        <div className="flex flex-row max-md:mt-4 mt-14 max-md:flex-col max-md:justify-center items-center">
          <div className="flex flex-col justify-center items-center p-10 pb-0 max-md:p-0">
            <div className="flex flex-row justify-center items-center">
              <img src={gameOver && errores < cantidadMaximaDeErroresPermitidos ?
                pokemon.sprites.front_default :
                `error_${errores}.png`
              }
              className="h-96 max-md:h-80 w-96 max-md:w-80"
              />
              {renderButtonChangePokemon()}
            </div>
            {renderCantidadLetras()}
          </div>
          {renderLetters()}
        </div>
        {
          gameOver && errores < cantidadMaximaDeErroresPermitidos && (
            <div>
              <Confetti />
              <h1 className="max-md:hidden font-serif text-9xl font-extrabold text-green-800">Ganaste</h1>
            </div>
          )
        }
        {
          gameOver && errores >= cantidadMaximaDeErroresPermitidos && (
            <h1 className="max-md:hidden font-serif text-9xl font-extrabold text-red-800">PERDISTE</h1>
          )
        }
      </div>
    )
  );
}

import { useState } from 'react'
import './style.css'
import { Title } from '@/core'

export default function CeilingPrice() {
  const [dy, setDy] = useState<[string | number]>([''])
  const [value, setValue] = useState<string | number>('')
  const [result, setResult] = useState(0)
  const [resulTeto, setResulTeto] = useState(0)

  const AddDy = () => {
    console.log(value)
    dy.push(value)
  }

  const format = (value: number | string) => {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const calculator = () => {
    const medio = dy.reduce(
      (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
      0
    )
    const value = (medio as any) / dy.length

    setResult(value)
    setResulTeto(value / 0.06)
  }

  return (
    <div className="container-ceilingPrice">
      <div className="">
        <h1>{Title.title_media}</h1>
        <ul>
          {dy.map((row, index) => (
            <li key={index}>{format(Number(row))}</li>
          ))}
        </ul>
      </div>

      <div className="container-ceilingPrice-input">
        <input
          type="number"
          value={value}
          onFocus={() => setValue('')}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            AddDy()
            setValue('')
          }}
        >
          Adicionar
        </button>
        <button onClick={() => calculator()}>Calcular</button>
        <button
          onClick={() => {
            setDy([])
            setResult(0)
            setResulTeto(0)
          }}
        >
          Limpar
        </button>
      </div>

      <div>
        <p>media: {format(result)}</p>
        <p>preço teto: {format(resulTeto)}</p>
      </div>
    </div>
  )
}

import { Label } from '@/core'
import './style.css'

interface Props {
  data: number[]
}

export default function ListValue({ data }: Props) {
  return (
    <div className="container-value-month">
      {data.map((row, index) => (
        <p className="container-value" key={index}>
          {Label.month} {index + 1}
          <span>R$ {row}</span>
          rendimento + aporte
          <span>R$ {data.length - 1 !== index ? (data[index + 1] - row).toFixed(2) : '00.00'}</span>
        </p>
      ))}
    </div>
  )
}

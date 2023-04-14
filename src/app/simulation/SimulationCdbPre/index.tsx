import { DollarSign, CalendarClock } from 'lucide-react'
import { Title, Label, Alert } from '@/core'
import './style.css'

interface Props {
  term: number | null
  valueInit: number | null
  msgValitaion: boolean
  onSetValueInit: (e: number) => void
  onSetTerm: (e: number) => void
  onGetSimulationCdb: () => void
}

export default function SimulationCdbPre({
  term,
  valueInit,
  msgValitaion,
  onSetTerm,
  onSetValueInit,
  onGetSimulationCdb
}: Props) {
  return (
    <section>
      <h1>{Title.title_calculate}</h1>
      <h3>{Label.simulate}</h3>

      <div className="card">
        <div>
          <p>{Label.value_applied}</p>

          <input
            min="1"
            id="valueInit"
            type="number"
            value={valueInit || ''}
            placeholder="R$ 1000"
            onChange={e => onSetValueInit(Number(e.target.value))}
          />
        </div>
        <DollarSign size={40} color="#000" />
      </div>

      <div className="card">
        <div>
          <p>{Label.deadline}</p>
          <input
            min="1"
            id="valueTerm"
            type="number"
            value={term || ''}
            placeholder="1"
            onChange={e => onSetTerm(Number(e.target.value))}
          />
        </div>
        <CalendarClock size={40} color="#000" />
      </div>

      {msgValitaion && <span>{Alert.alert_field}</span>}

      <button onClick={() => onGetSimulationCdb()}> {Label.simulate}</button>
    </section>
  )
}

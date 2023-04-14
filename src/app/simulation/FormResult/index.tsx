import { useState } from 'react'
import { Label, Title } from '@/core'
import ListValue from '@/components/ListValue'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { DataParams } from '..'
import './style.css'

interface Props {
  data: DataParams
  onSetViewResult: () => void
}

export default function SimulationCdb({ data, onSetViewResult }: Props) {
  const [viewIncome, setIncome] = useState(false)
  const {
    IR,
    term,
    income,
    valueInit,
    cdbPreFix,
    calcPercentageIR,
    arrayForMonthPercentage,
    valuePercentageMonth
  } = data

  const TextForm = (
    textBasic1?: string,
    textColor1?: string | number,
    textBasic2?: string,
    textColor2?: string | number
  ) => {
    return (
      <p>
        {textBasic1}: <span>R$ {textColor1}</span>
        {textBasic2} <span> {textColor2} </span>
      </p>
    )
  }

  return (
    <section>
      <h1>{Title.result}</h1>
      <div className="container-result">
        <span>
          {`Com  ${term} ${
            term == 1 ? 'ano' : 'anos'
          } de investimento de R$ ${valueInit} no CDB com a taxa de 13,25% ao ano
           `}
        </span>
        {TextForm(Label.cdb_pre, cdbPreFix, ' rendimento de ', `R$ ${income}`)}
        {TextForm(Label.IR, `${IR} `, '-', `(${calcPercentageIR}%)`)}

        <hr />

        <div className="container-income-investment">
          <p>
            Investindo <span> R$ 100.00 </span>
            todos os mês voce ter&aacute; : <span>R$ {valuePercentageMonth} </span>
          </p>
          <div className="container-income" onClick={() => setIncome(!viewIncome)}>
            <span> Investindo R$ 100,00 por mês ⬇️</span>
            {viewIncome ? <EyeIcon /> : <EyeOffIcon />}
          </div>
          {viewIncome && <ListValue data={arrayForMonthPercentage} />}
        </div>
      </div>

      <hr />

      <div className="container-infor">
        <span>
          <strong>{Title.title_table_ir}</strong>
          <br />
          Até 180 dias: <strong>22,50%</strong> dos rendimentos <br />
          De 181 a 360 dias: <strong> 20%</strong> dos rendimentos
          <br />
          De 361 a 720 dias: <strong>17,50% </strong> dos rendimentos
          <br />
          Acima de 720 dias: <strong>15%</strong> dos rendimentos <br />
          <strong>
            (obs: A cobrança é realizada no vencimento ou no resgate, apenas sobre os rendimentos)
          </strong>
        </span>
      </div>

      <button onClick={onSetViewResult}> {Label.new_simulate}</button>
    </section>
  )
}

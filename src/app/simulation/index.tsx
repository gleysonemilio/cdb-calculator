'use client'

import { useCallback, useState } from 'react'
import { getCalculatorCdb } from '@/app/api/getCalculator'
import FormResult from './FormResult'
import SimulationCdbPre from './SimulationCdbPre'
import './style.css'

export interface DataParams {
  IR?: string
  term: number
  valueInit: number
  cdbPreFix?: string
  income?: number | string
  valuePercentageMonth?: number
  arrayForMonthPercentage: number[]
  calcPercentageIR?: number | string
}

function SimulationCbd() {
  const [term, setTerm] = useState<number | null>(null)
  const [valueInit, setValueInit] = useState<number | null>(null)
  const [viewResult, setViewResult] = useState<boolean>(true)
  const [data, setData] = useState<DataParams>({} as DataParams)
  const [msgValitaion, setValitaion] = useState(false)

  const handleGetSimulationCdb = useCallback(async () => {
    if (valueInit && term) {
      try {
        const month = [...Array(term * 12)]
        var valuePercentageMonth = valueInit || 0

        const data = await getCalculatorCdb({ valueInit, term })

        const arrayForMonthPercentage: number[] = []

        month.forEach((_) => {
          const calPercentageMonth = (valuePercentageMonth * 1.10466666) / 100
          valuePercentageMonth = Number(
            (
              Number(valuePercentageMonth.toFixed(2)) +
              Number(calPercentageMonth.toFixed(2)) +
              100
            ).toFixed(2)
          )

          arrayForMonthPercentage.push(valuePercentageMonth)
        })

        setData({ ...data, valuePercentageMonth, arrayForMonthPercentage, valueInit, term })
        setViewResult(false)
        setValitaion(false)
      } catch (error) {
        console.error('error', error)
      }
    } else {
      setValitaion(true)
    }
  }, [valueInit, term, setData])

  return (
    <div className="container">
      {viewResult ? (
        <SimulationCdbPre
          term={term}
          valueInit={valueInit}
          msgValitaion={msgValitaion}
          onGetSimulationCdb={handleGetSimulationCdb}
          onSetValueInit={(e) => setValueInit(e)}
          onSetTerm={(e) => setTerm(e)}
        />
      ) : (
        <FormResult data={data} onSetViewResult={() => setViewResult(!viewResult)} />
      )}
    </div>
  )
}

export default SimulationCbd

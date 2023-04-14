interface GetCalculatorParams {
  valueInit: number
  term: number
}

export async function getCalculatorCdb({ valueInit, term }: GetCalculatorParams) {
  try {
    const array_term = [...Array(term)]
    const calcPercentageIR = term == 1 ? 17.5 : 15
    const count = array_term.map(_ => {
      return `[1 + (13.25% * 105%)]`
    })

    const valueBody = `${valueInit} * (${count.join('*')})`

    const cdbPreFix = await (
      await fetch('http://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ expr: valueBody, precision: 14 })
      })
    ).json()

    const cdbPreFixForm =
      JSON.parse(cdbPreFix?.result).length > 0
        ? JSON.parse(cdbPreFix?.result)[0].toFixed(2)
        : JSON.parse(cdbPreFix?.result).toFixed(2)

    const income = (Number(cdbPreFixForm) - Number(valueInit)).toFixed(2)
    const IR = ((Number(income) * calcPercentageIR) / 100).toFixed(2)

    return {
      cdbPreFix: cdbPreFixForm,
      calcPercentageIR,
      income,
      IR
    }
  } catch (error) {
    console.error('error', error)
  }
}

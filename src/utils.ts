const isDivisible = (dividend: number, divisor: number): boolean => {
  if (dividend === 1 || divisor === 1) {
    return false
  }

  const quotient = dividend > divisor ? dividend / divisor : divisor / dividend
  
  return Math.floor(quotient) === quotient
}

const isLastIndex = (indexToCheck: number, arr: any[]): boolean =>  {
  return indexToCheck === arr.length - 1
}

export { isDivisible, isLastIndex }
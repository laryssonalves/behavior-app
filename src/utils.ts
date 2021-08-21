const isDivisible = (dividend: number, divisor: number): boolean => {
  if (dividend === 1 || divisor === 1) {
    return false
  }

  const quotient = dividend > divisor ? dividend / divisor : divisor / dividend
  
  return Math.floor(quotient) === quotient
}

export { isDivisible }
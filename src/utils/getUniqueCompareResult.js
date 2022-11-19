export function getUniqueCompareResult(arr1, arr2) {
  const finalArray = arr1.filter(
    (one) => !arr2.find((two) => one.id === two.id)
  )
  return finalArray
}

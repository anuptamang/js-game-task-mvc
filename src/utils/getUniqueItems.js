export function getUniqueItems(items) {
  return items.filter(
    (value, index, self) =>
      self.findIndex((v) => v.type === value.type) === index
  )
}

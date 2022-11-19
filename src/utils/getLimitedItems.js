export function getLimitedItems(items, limit) {
  return items?.filter((item, idx) => idx < limit)
}

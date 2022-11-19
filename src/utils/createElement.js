function createElement(tag, className, attr) {
  const element = document.createElement(tag)
  if (className) element.classList.add(className)
  if (attr) element.setAttribute(attr, true)

  return element
}

export { createElement }

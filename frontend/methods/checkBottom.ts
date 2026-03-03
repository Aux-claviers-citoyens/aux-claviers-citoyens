export const checkIfBottom = () => {
  const scrollTop = window.scrollY
  const viewportHeight = window.innerHeight
  const fullHeight = document.documentElement.scrollHeight

  return scrollTop + viewportHeight >= fullHeight - 5
}

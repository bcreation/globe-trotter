
export const handleDownNavigation = (e: KeyboardEvent | MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target) return

  let li: HTMLElement | null = null

  if (target.tagName === 'INPUT') {
    li = document.querySelector('#suggestion > li')

    setTimeout(() => {
      // fixed scroll behavior
      li?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  if (target.tagName === 'LI') {
    li = target.nextElementSibling as HTMLElement
   
  }

  if (!li) return

  selectAndFocusElement(li, target)
}

export const handleUpNavigation = (e: KeyboardEvent | MouseEvent) => {
  const target = e.target as HTMLElement
  target.setAttribute('aria-selected', 'false')
  const li = target.previousElementSibling as HTMLElement
  if (!li) {
    const input = document.querySelector('#search_country') as HTMLElement
    input.focus()
    return
  }
  selectAndFocusElement(li)
}

export const handleBackspaceNavigation = (e: KeyboardEvent | MouseEvent) => {
  const target = e.target as HTMLElement
  target.setAttribute('aria-selected', 'false')
   const li = target.previousElementSibling as HTMLElement
  if (li) {
    setTimeout(() => {
      // fixed scroll behavior
      li?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }
  const input = document.querySelector('#search_country') as HTMLElement
  input.focus()
}
const selectAndFocusElement = (element: HTMLElement | null, target: HTMLElement | null = null) => {
  element?.setAttribute('aria-selected', 'true')
  element?.focus()
  target?.setAttribute('aria-selected', 'false')
}

export default { handleDownNavigation, handleUpNavigation }
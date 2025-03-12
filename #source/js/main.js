const customSlider = (name, opts) => {
  const slider = document.querySelector(`.${name}`)
  const sliderWrapper = slider.querySelector('.slider-wrapper')
  const toggler = slider.querySelector('.toggle-visibility')

  const {
    duration,
    width: slideWidth,
    height: slideHeight,
    space,
    navigation,
    mobScale
  } = opts

  const arrowNext = slider.querySelector(`.${navigation.next}`)
  const arrowPrev = slider.querySelector(`.${navigation.prev}`)

  let isMoving = false
  let isMobile = window.innerWidth <= 768

  const updateIsMobile = () => (isMobile = window.innerWidth <= 768)

  const actionHelper = (slide, i) => {
    const isWideScreen = !isMobile
    const factor = isWideScreen ? 1 : mobScale

    slide.style.left =
      i > 1
        ? `calc(${isWideScreen ? '50%' : '0rem'} + ${
            (i - 2) * (slideWidth / factor + space / 10)
          }rem)`
        : '0rem'

    slide.style.width = i > 1 ? `${slideWidth / factor}rem ` : '100%'
    slide.style.height = i > 1 ? `${slideHeight / factor}rem` : '100%'
    slide.style.opacity = i > 3 ? '0' : '1'

    if (i === 1) setTimeout(() => slide.classList.add('observed'), duration)
  }

  const initializeSlides = () => {
    Array.from(sliderWrapper.children).forEach((slide, i) => {
      actionHelper(slide, i)

      setTimeout(() => {
        slide.style.transition = `all ${duration}ms ease-in-out`
      }, 0)
    })
  }

  const slidesActions = () => {
    const slides = Array.from(sliderWrapper.children)

    slides.forEach(slide => slide.classList.remove('observed'))
    slides.forEach((slide, i) => actionHelper(slide, i))
  }

  const moveHandler = direction => {
    if (isMoving) return
    isMoving = true

    const slides = Array.from(sliderWrapper.children)

    direction === 'next'
      ? sliderWrapper.prepend(slides.pop())
      : sliderWrapper.appendChild(slides.shift())

    slidesActions()
  }

  sliderWrapper.addEventListener('transitionend', e => {
    if (e.propertyName === 'width') isMoving = false
  })

  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768
    if (newIsMobile !== isMobile) {
      updateIsMobile()
      initializeSlides()
    }
  })

  const setupNavigation = () => {
    arrowNext.addEventListener('click', () => moveHandler('next'))
    arrowPrev.addEventListener('click', () => moveHandler('prev'))
  }
  // Toggle image viability
  toggler.addEventListener('click', () => {
    if (isMoving == false) {
      toggler.classList.toggle('hide')
      arrowNext.classList.toggle('hidden')
      arrowPrev.classList.toggle('hidden')

      Array.from(sliderWrapper.children).forEach(slide => {
        slide.classList.contains('observed')
          ? slide.querySelector('.content').classList.toggle('hidden')
          : slide.classList.toggle('hidden')
      })
    }
  })

  initializeSlides()
  setupNavigation()
}

window.addEventListener('load', () => {
  customSlider('custom_slider', {
    duration: 500,
    width: 25,
    height: 15,
    space: 20,
    mobScale: 1.5,
    navigation: {
      next: 'arrow_next',
      prev: 'arrow_prev'
    }
  })
})

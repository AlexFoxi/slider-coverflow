const customSlider = (name, opts) => {
  const slider = document.querySelector(`.${name}`)
  const sliderWrapper = slider.querySelector('.slider-wrapper')

  const {
    duration,
    width: slideWidth,
    height: slideHeight,
    space,
    navigation
  } = opts

  let isMoving = false
  let isMobile = window.innerWidth <= 768

  const updateIsMobile = () => (isMobile = window.innerWidth <= 768)

  const actionHelper = (slide, i) => {
    const isWideScreen = !isMobile

    slide.style.left =
      i > 1
        ? `calc(${isWideScreen ? '50%' : '0rem'} + ${
            (i - 2) * (slideWidth + space)
          }rem)`
        : '0rem'

    slide.style.width = i > 1 ? `${slideWidth}rem ` : '100%'
    slide.style.height = i > 1 ? `${slideHeight}rem` : '100%'
    slide.style.opacity = i > 3 ? '0' : '1'
    if (i === 1) {
      setTimeout(() => slide.classList.add('observed'), duration)
    }
  }

  const setSlidesBase = () => {
    Array.from(sliderWrapper.children).map((slide, i) => {
      actionHelper(slide, i)

      setTimeout(() => {
        slide.style.transition = `all ${duration}ms ease-in-out`
      }, 0)
    })
  }

  const slidesActions = () => {
    const slides = Array.from(sliderWrapper.children)

    slides.forEach(slide => {
      slide.classList.contains('observed') && slide.classList.remove('observed')
    })

    slides.map((slide, i) => {
      actionHelper(slide, i)
    })
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
      setSlidesBase()
    }
  })

  const mouseEvents = slider => {
    const arrowNext = slider.querySelector(`.${navigation.next}`)
    const arrowPrev = slider.querySelector(`.${navigation.prev}`)

    arrowNext.addEventListener('click', () => moveHandler('next'))
    arrowPrev.addEventListener('click', () => moveHandler('prev'))
  }

  const initSlider = slider => {
    setSlidesBase()
    mouseEvents(slider)
  }

  initSlider(slider)
}

window.addEventListener('load', e => {
  customSlider('custom_slider', {
    duration: 500,
    width: 25,
    height: 15,
    space: 2,
    navigation: {
      next: 'arrow_next',
      prev: 'arrow_prev'
    }
  })
})

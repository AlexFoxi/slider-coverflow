const customSlider = (name, opts) => {
  const slider = document.querySelector(`.${name}`)
  const sliderWrapper = slider.querySelector('.slider-wrapper')

  const duration = opts.duration
  const slideWidth = opts.width
  const slideHeight = opts.height
  const space = opts.space

  let isMoving = false

  const actionHelper = (slides, slide, i) => {
    if (i > 1) {
      slide.style.left = `calc(50% + ${(i - 2) * (slideWidth + space)}rem)`
      slide.style.width = `${slideWidth}rem`
      slide.style.height = `${slideHeight}rem`
    } else {
      slide.style.left = `0rem`
      slide.style.width = '100%'
      slide.style.height = '100%'
    }

    if (i == 1) {
      setTimeout(() => {
        slide.classList.add('observed')
      }, duration)
    }
    console.log(i, slides.length - 1, slide)

    i > 3 ? (slide.style.opacity = '0') : (slide.style.opacity = '1')
  }

  const setSlidesBase = () => {
    const slides = Array.from(sliderWrapper.children)

    slides.map((slide, i) => {
      actionHelper(slides, slide, i)

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
      actionHelper(slides, slide, i)
    })
  }

  const moveHandler = direction => {
    if (isMoving) return
    isMoving = true

    const slides = Array.from(sliderWrapper.children)

    if (direction === 'left') {
      sliderWrapper.prepend(slides[slides.length - 1])
    } else if (direction === 'right') {
      sliderWrapper.appendChild(slides[0])
    }
    slidesActions()
  }

  sliderWrapper.addEventListener('transitionend', e => {
    if (e.propertyName === 'width') {
      isMoving = false
    }
  })

  const mouseEvents = slider => {
    const arrowLeft = slider.querySelector(`.${opts.navigation.left}`)
    const arrowRight = slider.querySelector(`.${opts.navigation.right}`)

    arrowLeft.addEventListener('click', () => moveHandler('left'))
    arrowRight.addEventListener('click', () => moveHandler('right'))
  }

  const initSlider = slider => {
    setSlidesBase()
    mouseEvents(slider)
  }

  initSlider(slider)
}

window.addEventListener('load', () => {
  customSlider('custom_slider', {
    duration: 500,
    width: 25,
    height: 15,
    space: 2,
    navigation: {
      left: 'arrow_left',
      right: 'arrow_right'
    }
  })
})

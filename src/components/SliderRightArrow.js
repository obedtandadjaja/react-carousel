import React from 'react'

const SliderRightArrow = ({ nextSlide }) => {
  return (
    <div className='slider-right-arrow' onClick={nextSlide}>
      &gt;
    </div>
  )
}

export default SliderRightArrow

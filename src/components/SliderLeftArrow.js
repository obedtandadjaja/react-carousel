import React from 'react'

const SliderLeftArrow = ({ prevSlide }) => {
  return (
    <div className='slider-left-arrow' onClick={prevSlide}>
      &lt;
    </div>
  )
}

export default SliderLeftArrow

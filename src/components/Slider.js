import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import axios from 'axios'
import Slide from './Slide'
import Dots from './Dots'
import SliderLeftArrow from './SliderLeftArrow'
import SliderRightArrow from './SliderRightArrow'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      autoplay: undefined
    }
  }

  componentDidMount = () => {
    this.props.getSliderImages()
    this.resetAutoplayTimer()
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  renderSlides = () => {
    const { images } = this.props
    return images.map((curr, i) => <Slide key={i} image={images[i]} />)
  }

  render() {
    const {
      images,
      index,
      translateValue
    } = this.props

    return (
      <div className="slider" onKeyPress={this.handleKeyUp}>
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.5s'
          }}>
          { this.renderSlides() }
        </div>

        <Dots
          index={index}
          images={images}
          dotClick={this.handleDotClick} />

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
      </div>
    )
  }

  goToPreviousSlide = () => {
    const { images, index, translateValue, setTranslateValue, setIndex } = this.props

    setTranslateValue(index == 0 ? translateValue - this.slideWidth()*(images.length-1) : translateValue + this.slideWidth())
    setIndex(index == 0 ? images.length-1 : index-1)
    this.resetAutoplayTimer()
  }

  goToNextSlide = () => {
    const { images, index, translateValue, setTranslateValue, setIndex } = this.props

    setTranslateValue(index == images.length-1 ? translateValue + this.slideWidth()*(images.length-1) : translateValue - this.slideWidth())
    setIndex((index+1)%images.length)
    this.resetAutoplayTimer()
  }

  handleDotClick = i => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    if(i === index)
      return

    if(i > index)
      setTranslateValue(-(i * this.slideWidth()))
    else
      setTranslateValue(translateValue + ((index - i) * (this.slideWidth())))

    setIndex(i)
    this.resetAutoplayTimer()
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    return slide.clientWidth
  }

  resetAutoplayTimer = () => {
    clearInterval(this.state.autoplay);
    this.setState({
      autoplay: setInterval(() => {
        this.goToNextSlide()
      }, 5000)
    });
  }

  handleKeyDown = (e) => {
    // left
    if(e.keyCode == 37) this.goToPreviousSlide()
    // right
    else if(e.keyCode == 39) this.goToNextSlide()
  }

}

const mapStateToProps = ({ slider, settings }) => {
  return {
    images: slider.images,
    index: slider.index,
    translateValue: slider.translateValue
  }
}

export default connect(mapStateToProps, actions)(Slider)

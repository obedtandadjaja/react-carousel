import React from 'react'

const Slide = ({ image }) => {

  const styles = {
    backgroundImage: `url(https://picsum.photos/1800/1020?image=${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  }

  return <div className="slide" style={styles}></div>
}

export default Slide

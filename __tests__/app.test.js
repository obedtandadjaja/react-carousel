import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/components/app'

describe('Top Level App Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('Should have a div with className of app', () => {
    expect(wrapper.find('.app').length).toEqual(1)
  })

}) // end describe block

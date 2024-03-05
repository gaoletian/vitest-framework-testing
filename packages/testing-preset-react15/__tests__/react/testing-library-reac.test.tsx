// use testing-library/react to test component
// Path: packages/testing-preset-react15/__tests__/testing-library-reac.test.tsx

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Link from './Link'

test('Link changes the class when hovered', () => {
  const { getByText } = render(
    <Link page="http://antfu.me">Anthony Fu</Link>,
  )

  const linkElement = getByText(/Anthony Fu/i)

  // manually trigger the callback
  fireEvent.mouseEnter(linkElement)

  // re-rendering
  expect(linkElement).toHaveClass('hovered')

  // manually trigger the callback
  fireEvent.mouseLeave(linkElement)
  // re-rendering
  expect(linkElement).toHaveClass('normal')
})
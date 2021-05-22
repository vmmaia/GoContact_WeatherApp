import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../spinner';

describe('Spinner component tests', () => {
  it('Renders correctly', () => {
    const component = render(<Spinner />);

    const wrapper = component.getByTestId('spinner-wrapper');

    expect(wrapper.className).toBe('spinner-wrapper');
    expect(wrapper.children.length).toBe(2);

    const icon = wrapper.children[0];
    const text = wrapper.children[1];

    expect(icon.tagName).toBe('I');
    expect(icon.classList.contains('fa')).toBe(true);
    expect(icon.classList.contains('fa-spinner')).toBe(true);

    expect(text.tagName).toBe('SPAN');
    expect(text.innerHTML).toBe('Searching');
  });
});

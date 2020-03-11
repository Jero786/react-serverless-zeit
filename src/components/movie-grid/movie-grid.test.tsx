import React from 'react';
import { MovieGrid } from '.';
import { render } from '@testing-library/react';
import movies from '../../__test__/mocks/movies.json';

describe('Movie Grid', () => {
  it('should show the title properly', () => {
    const mockTitle = 'Brisa I love you';
    const movie = { ...movies[0], title: mockTitle };

    const { getByText } = render(<MovieGrid movie={movie} />);

    expect(getByText(mockTitle)).toBeInTheDocument();
  });

  it('should show the votes properly', () => {
    const movie = { ...movies[0], vote_average_ui: 5 };

    const { getByLabelText } = render(<MovieGrid movie={movie} />);

    expect(getByLabelText(/5 Stars/i)).toBeInTheDocument();
  });
});

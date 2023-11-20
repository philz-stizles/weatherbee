import { render } from '@testing-library/react';
import InfoCard from './InfoCard';

describe('InfoCard', () => {
  test('renders', () => {
    const data = {};
    render(<InfoCard title='' value='' />);
  });
});

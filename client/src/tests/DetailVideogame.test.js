import { render, screen } from '@testing-library/react';
import Detailvideogame from '../pages/Detailvideogame';
it('Should render a loading', () => {
	render(<Detailvideogame />);
	const p = screen.getByRole('heading');
	expect(p).toBeInTheDocument();
});

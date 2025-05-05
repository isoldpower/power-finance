import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { List } from './List';


describe('List Component', () => {
	test('renders <ul> and its children as <li>', () => {
		render(
			<List>
				<span>One</span>
				<span>Two</span>
				<span>Three</span>
			</List>
		);

		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();

		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(3);
		expect(items[0]).toHaveTextContent('One');
		expect(items[1]).toHaveTextContent('Two');
		expect(items[2]).toHaveTextContent('Three');
	});

	test('applies static elementProps to each <li>', () => {
		render(
			<List elementProps={{ className: 'test-class' }}>
				<span>Item</span>
			</List>
		);

		const item = screen.getByRole('listitem');
		expect(item).toHaveClass('test-class');
	});

	test('applies dynamic elementProps function to each <li>', () => {
		render(
			<List
				elementProps={(index) => ({
					'data-index': `li-${index}`,
					className: index % 2 === 0 ? 'even' : 'odd',
				})}
			>
				<span>First</span>
				<span>Second</span>
			</List>
		);

		const items = screen.getAllByRole('listitem');
		expect(items[0]).toHaveAttribute('data-index', 'li-0');
		expect(items[0]).toHaveClass('even');
		expect(items[1]).toHaveAttribute('data-index', 'li-1');
		expect(items[1]).toHaveClass('odd');
	});

	test('renders no <li> if no children are passed', () => {
		const { container } = render(<List />);
		expect(container.querySelectorAll('li')).toHaveLength(0);
	});
});

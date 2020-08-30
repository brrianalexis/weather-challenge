import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer component', () => {
	test('should render', () => {
		const { container } = render(<Footer />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
		expect(container).toMatchInlineSnapshot(`
		<div>
		  <footer
		    class="ant-layout-footer"
		  >
		    <p
		      style="text-align: center;"
		    >
		      Made with
		      <span
		        aria-label="heart emoji"
		        role="img"
		      >
		        💖
		      </span>
		      by 
		      <a
		        href="https://www.github.com/brrianalexis"
		      >
		        Brian Alexis
		      </a>
		       - 2020
		    </p>
		  </footer>
		</div>
	`);
	});

	test('should have the appropiate text content', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toHaveTextContent(/made with.*by brian alexis - 2020/i);
	});

	test('should have the antd class', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toHaveClass('ant-layout-footer');
	});

	test('should have a heart emoji inside a span with a role of img and an aria-label describing it', () => {
		render(<Footer />);
		expect(
			screen.getByRole('img', {
				name: /heart emoji/i,
			})
		).toHaveTextContent('💖');
	});

	test('should have a link to my GitHub profile', () => {
		render(<Footer />);
		expect(screen.getByRole('link', { name: /brian alexis/i })).toHaveAttribute(
			'href',
			'https://www.github.com/brrianalexis'
		);
	});
});

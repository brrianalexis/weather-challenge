import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

describe('SearchInput component', () => {
	test('should render an input with a placeholder and a button to perform a search', () => {
		const { container } = render(<SearchInput />);
		expect(container).toMatchInlineSnapshot(`
		<div>
		  <div
		    class="search-input-container"
		  >
		    <span
		      class="ant-input-search ant-input-search-enter-button ant-input-search-large ant-input-group-wrapper ant-input-group-wrapper-lg"
		    >
		      <span
		        class="ant-input-wrapper ant-input-group"
		      >
		        <input
		          class="ant-input ant-input-lg"
		          placeholder="Search..."
		          type="text"
		          value=""
		        />
		        <span
		          class="ant-input-group-addon"
		        >
		          <button
		            class="ant-btn ant-input-search-button ant-btn-primary ant-btn-lg"
		            type="button"
		          >
		            <span>
		              Search
		            </span>
		          </button>
		        </span>
		      </span>
		    </span>
		  </div>
		</div>
	`);
		expect(screen.getByRole('textbox')).toHaveClass('ant-input ant-input-lg');

		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
		expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Search...');

		expect(
			screen.getByRole('button', {
				name: /search/i,
			})
		).toHaveTextContent('Search');
	});
});

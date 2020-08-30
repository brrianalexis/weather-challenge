import React from 'react';
import { Input } from 'antd';
import './search-input.css';

const { Search } = Input;

export const SearchInput = () => {
	return (
		<div className="search-input-container">
			<Search
				placeholder="Search..."
				enterButton="Search"
				size="large"
				onSearch={(value, e) => {
					e.target.value = null;
				}}
			/>
		</div>
	);
};

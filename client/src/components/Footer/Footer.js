import React from 'react';
import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer = () => {
	return (
		<AntdFooter>
			<p style={{ textAlign: 'center' }}>
				Made with
				<span role="img" aria-label="heart emoji">
					💖
				</span>
				by <a href="https://www.github.com/brrianalexis">Brian Alexis</a> - 2020
			</p>
		</AntdFooter>
	);
};

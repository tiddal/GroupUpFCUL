import React from 'react';

import { Container, TableHeader, TableLine, TableCell } from './styles';

function Table({ columns_width, columns, rows }) {
	return (
		<Container columns_width={columns_width}>
			<TableHeader>
				{columns.map((column, index) => (
					<TableCell key={`column${index}`} align={column.align}>
						{column.name}
					</TableCell>
				))}
			</TableHeader>
			{rows.map((row, i) => (
				<TableLine key={`row${i}`}>
					{row.cells.map((cell, e) => (
						<TableCell key={`cell${i}${e}`} align={cell.align}>
							{cell.data}
						</TableCell>
					))}
				</TableLine>
			))}
		</Container>
	);
}

export default Table;

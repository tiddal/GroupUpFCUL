import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import professorService from '../../services/professor';

import Navigation from '../Navigation';

function AsyncNavigation() {
	const { user } = useAuth();
	const [unitsData, setUnitsData] = useState();

	useEffect(() => {
		async function getUnits() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const units = classes.reduce((unique, unit) => {
				return unique.some((item) => item.code === unit.code)
					? unique
					: [...unique, unit];
			}, []);
			setUnitsData(units);
		}
		getUnits();
	}, [user]);

	return (
		<Navigation
			items={
				unitsData
					? unitsData.map((unit) => ({
							icon: <div>{unit.initials}</div>,
							name: unit.name,
							path: `/projects/${unit.code}`,
					  }))
					: []
			}
		/>
	);
}

export default React.memo(AsyncNavigation);

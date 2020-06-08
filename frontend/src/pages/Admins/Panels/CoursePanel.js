import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import adminService from '../../../services/admin';

import { CardSpinner } from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import { FaListUl, FaEdit, FaSearch, FaBook } from 'react-icons/fa';

import {
	Container,
	SearchSection,
	SearchBar,
	Button,
	StatusCardData,
} from './styles';

function CoursePanel() {
	const [loading, setLoading] = useState(true);
	const [courseData, setCourseData] = useState({
		initials: '',
		code: '',
		units: [],
	});
	const [searchInput, setSearchInput] = useState('');
	const {
		params: { course },
	} = useRouteMatch('/courses/:course');
	const history = useHistory();

	useEffect(() => {
		async function setState() {
			const [{ initials, code }] = await adminService.get.courseByCode(course);
			const units = await adminService.get.unitsFromCourse(course);
			setCourseData({ initials, code, units });
			setLoading(false);
		}
		setState();
	}, [course]);

	function handleSearch(event) {
		event.preventDefault();
		history.push({
			pathname: `/courses/${course}/units`,
			panelSearchInput: searchInput,
		});
	}

	return (
		<>
			{!loading && (
				<Context
					path={[
						{ tier: 'courses', title: 'cursos' },
						{ tier: `courses/${courseData.code}`, title: courseData.initials },
					]}
				/>
			)}

			<Container>
				<StatusCard
					data={
						loading ? (
							<CardSpinner />
						) : (
							<>
								<StatusCardData>
									{courseData.units.length} Cadeiras
								</StatusCardData>
							</>
						)
					}
				/>
				<SearchCard>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar cadeira...'}
							onChange={({ target }) => setSearchInput(target.value)}
						/>
						<Button>
							<FaSearch />
						</Button>
						<span>Procurar por código de cadeira</span>
					</SearchSection>
				</SearchCard>

				<XSmallCard
					path={`/courses/${courseData.code}/units`}
					label={'Ver lista de Cadeiras'}
					icon={<FaListUl />}
				/>
				<XSmallCard
					path={`/courses/${courseData.code}/units/new`}
					label={'Adicionar Cadeira'}
					icon={<FaBook />}
				/>
				<XSmallCard
					path={`/courses/${courseData.code}/edit`}
					label={'Editar Curso'}
					icon={<FaEdit />}
				/>
			</Container>
		</>
	);
}

export default CoursePanel;

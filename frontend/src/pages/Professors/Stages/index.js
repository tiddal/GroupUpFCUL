import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import professorService from '../../../services/professor';

import { Card } from '../../../components/Card';
import { Container, Content, Details } from './styles';
import { FaArchive } from 'react-icons/fa';
import Spinner from '../../../components/Spinner';
import Context from '../../../components/Context';

function Stages() {
	const { user } = useAuth();
	const {
		params: { unit, project },
		url,
	} = useRouteMatch('/projects/:unit/:project/stages');
	const [unitData, setUnitData] = useState();
	const [initializing, setInitializing] = useState(true);
	const [stagesData, setStagesData] = useState([]);

	useEffect(() => {
		async function getInitialState() {
			const classes = await professorService.get.classes(
				user.username,
				'2019-2020',
				2
			);
			const [unitData] = classes.filter(
				(class_) => class_.code.toString() === unit
			);
			setUnitData(unitData);
			const stages = await professorService.get.stages(
				unitData.course_code,
				unitData.code,
				'2019-2020',
				project
			);
			const stagesData = [];
			for (let stage of stages) {
				const submissions = await professorService.get.submissions(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project,
					stage.stage_number
				);
				const teams = await professorService.get.teams(
					unitData.course_code,
					unitData.code,
					'2019-2020',
					project
				);
				stagesData.push({
					number: stage.stage_number,
					start_date: stage.start_date,
					end_date: stage.end_date,
					submissions: submissions.length,
					teams: teams.length,
				});
			}
			setStagesData(stagesData);
			setInitializing(false);
		}
		getInitialState();
	}, [user, unit, project]);
	return (
		<>
			{!initializing && (
				<Context
					path={[
						{ tier: `projects/${unit}`, title: unitData.name },
						{
							tier: `projects/${unit}/${project}/stages`,
							title: `Projeto ${project} - Etapas`,
						},
					]}
				/>
			)}
			{initializing ? (
				<Spinner />
			) : (
				<Container>
					<Content>
						{stagesData.map((stage) => (
							<Card
								key={stage.number}
								title={`etapa ${stage.number}`}
								icon={<FaArchive />}
								link={{
									path: `${url}/${stage.number}/submissions`,
									label: 'Ver Submissões',
								}}
								content={
									<Details>
										{stage.submissions}/{stage.teams} Submissões
										<p>
											{stage.start_date} - {stage.end_date}
										</p>
									</Details>
								}
							/>
						))}
					</Content>
				</Container>
			)}
		</>
	);
}

export default Stages;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
	Container,
	MainButton,
	Card,
	Title,
	ExpandButton,
	Content,
	MembersSection,
	Button,
	Member,
} from './styles';
import Context from '../../../components/Context';

import {
	FaPlus,
	FaAngleDown,
	FaStar,
	FaStarHalf,
	FaUsers,
	FaUserPlus,
} from 'react-icons/fa';

function Teams() {
	const history = useHistory();
	const [groupsData, setGroupsData] = useState([
		{
			number: 1,
			expand: false,
		},
		{
			number: 2,
			expand: false,
		},
	]);

	function handleCreateGroup() {
		history.push('/projects/26757/1/teams/1');
	}

	function handleCardState(card) {
		setGroupsData(
			groupsData.map((group) =>
				group.number === card.number
					? { ...group, expand: !group.expand }
					: { ...group }
			)
		);
	}
	return (
		<>
			<Context
				path={[
					{ tier: '', title: 'projetos' },
					{ tier: `projects/`, title: 'unitData.name' },
				]}
			/>
			<Container>
				<MainButton onClick={handleCreateGroup}>
					<FaPlus />
					Criar Grupo
				</MainButton>
				{groupsData.map((group) => (
					<Card key={group.number} expand={group.expand} members={7}>
						<Title onClick={() => handleCardState(group)}>
							<span>
								<FaUsers />
								Grupo 1
							</span>
							<ExpandButton expand={group.expand}>
								<FaAngleDown />
							</ExpandButton>
						</Title>
						<Content expand={group.expand}>
							<MembersSection>
								<span>Membros: (7/8)</span>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
								<Member>
									<span>S</span>
									<div>
										<p>Student Test</p>
										<p>fc00001</p>
										<p>
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStar />
											<FaStarHalf />
										</p>
									</div>
								</Member>
							</MembersSection>
							<Button>
								<FaUserPlus /> Aderir ao Grupo
							</Button>
						</Content>
					</Card>
				))}
			</Container>
		</>
	);
}

export default Teams;

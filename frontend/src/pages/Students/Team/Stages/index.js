import React from 'react';

import {
	Container,
	Dropdown,
	InfoSection,
	Badge,
	BadgeLink,
	StageDescription,
	ArtifactsSection,
	SectionTitle,
	Artifacts,
	Artifact,
	LoadArtifact,
	EvaluationSection,
	Feedback,
} from './styles';
import {
	FaAngleDown,
	FaClock,
	FaBalanceScaleRight,
	FaFilePdf,
	FaExternalLinkAlt,
	FaInfoCircle,
	FaTimes,
	FaFileUpload,
} from 'react-icons/fa';

const initialState = {
	stage1: {
		number: 1,
		due_date: '26/06/2020',
		due_Time: '10h00',
		weight: 25,
		assignment_url: '/',
		description:
			'Não façam nada por favor ou serão severamente penalizados. Estão avisados.',
		artifacts: [{ filename: 'pti_grupo_05.pdf', type: '.pdf', url: '/' }],
		feedback: 'Fizeram demasiado...',
		grade: '13',
	},
};

function Members() {
	return (
		<Container>
			<Dropdown>
				<span>
					<FaAngleDown />
				</span>
				<select>
					<option>Etapa 1</option>
					<option>Etapa 2</option>
				</select>
			</Dropdown>
			<InfoSection>
				<Badge type="warning">
					<FaClock />
					26/06/2020, 10h00
				</Badge>
				<Badge type="info">
					<FaBalanceScaleRight />
					25% do Projeto
				</Badge>
				<BadgeLink to="/" target="_blank">
					<FaFilePdf />
					<span>
						Enunciado
						<FaExternalLinkAlt />
					</span>
				</BadgeLink>
				<StageDescription>
					<FaInfoCircle />
					<div>
						Não façam nada por favor ou serão severamente penalizados. Estão
						avisados.
					</div>
				</StageDescription>
			</InfoSection>
			<ArtifactsSection>
				<SectionTitle>Artefactos produzidos:</SectionTitle>
				<Artifacts>
					<Artifact>
						<FaFilePdf />
						<button
							onClick={() => {
								console.log('remove');
							}}
						>
							<FaTimes />
						</button>
						<span>pti_grupo_05.pdf</span>
					</Artifact>
					<LoadArtifact>
						<FaFileUpload />
						<span>Carregar ficheiro</span>
					</LoadArtifact>
				</Artifacts>
			</ArtifactsSection>
			<EvaluationSection>
				<SectionTitle>Avaliação e comentários:</SectionTitle>
				<Feedback>
					<div>Fizeram demasiado... </div>
					<span>13%</span>
				</Feedback>
			</EvaluationSection>
		</Container>
	);
}

export default Members;

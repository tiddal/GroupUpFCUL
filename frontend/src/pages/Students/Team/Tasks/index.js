import React from 'react';

import {
	Container,
	ProgressSection,
	ProgressTitle,
	MainButton,
	TaskCard,
	TaskTitle,
	TagsSection,
	Tag,
	Button,
	ProgressBar,
} from './styles';

import {
	FaClipboardCheck,
	FaEdit,
	FaTrash,
	FaPlus,
	FaCheckCircle,
	FaChartLine,
	FaHammer,
	FaClipboardList,
} from 'react-icons/fa';

import Input from '../../../../components/Input';

function Tasks() {
	return (
		<Container>
			<ProgressSection>
				<ProgressTitle>
					<FaChartLine />
					<span>Progresso</span>
				</ProgressTitle>
				<ProgressBar progress={'50%'} type={'warning'}>
					<div>
						<div></div>
					</div>
					<span>
						<strong>1</strong> de <strong>2</strong> tarefas concluídas
					</span>
				</ProgressBar>
			</ProgressSection>
			<MainButton>
				<FaPlus />
				Nova Tarefa
			</MainButton>
			<TaskCard>
				<TaskTitle type="success">
					<FaClipboardCheck />
					<span>#1</span>
					<input type="text" value="Fazer tudo" disabled />
					<div></div>
				</TaskTitle>
				<TagsSection>
					<Tag type="success">
						<FaCheckCircle /> Concluída por Student Test
					</Tag>
				</TagsSection>
				<form>
					<Input
						id="1"
						type="textarea"
						label="Descrição"
						change={() => {}}
						validation={{ required: false }}
						value="Tem que se fazer tudo"
					/>
					<Input
						id="2"
						type="text"
						label="Tempo dedicado (h)"
						change={() => {}}
						validation={{ required: false }}
						value="4"
					/>
					<Button type="submit">Reabrir</Button>
				</form>
			</TaskCard>
			<TaskCard>
				<TaskTitle>
					<FaClipboardList />
					<span>#2</span>
					<input type="text" value="Fazer nada" disabled />
					<div>
						<button>
							<FaEdit />
						</button>
						<button>
							<FaTrash />
						</button>
					</div>
				</TaskTitle>
				<TagsSection>
					<Tag type="warning">
						<FaHammer />A trabalhar
					</Tag>
				</TagsSection>
				<form>
					<Input
						id="1"
						type="textarea"
						label="Descrição"
						change={() => {}}
						validation={{ required: false }}
						value="Não é preciso fazer nada"
					/>
					<Input
						id="2"
						type="text"
						label="Tempo dedicado (h)"
						change={() => {}}
						validation={{ required: false }}
						value=""
					/>
					<Button type="submit">Concluír</Button>
				</form>
			</TaskCard>
		</Container>
	);
}

export default Tasks;

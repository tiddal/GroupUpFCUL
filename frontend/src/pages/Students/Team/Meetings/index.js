import React, { useState } from 'react';

import {
	Container,
	Card,
	Title,
	ParticipantsSection,
	Button,
	MainButton,
} from './styles';

import Input from '../../../../components/Input';

import { FaHandshake, FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

function Meetings() {
	const [editMode, setEditMode] = useState(false);
	return (
		<Container>
			<MainButton onClick={() => {}}>
				<FaPlus />
				Marcar Reunião
			</MainButton>
			<Card>
				<Title>
					<span>
						<FaHandshake />
						1ª Reunião
					</span>
					<div>
						<button onClick={() => setEditMode(!editMode)}>
							{editMode ? <FaEdit /> : <FaSave />}
						</button>
						<button>
							<FaTrash />
						</button>
					</div>
				</Title>
				<Input
					key={1}
					id="date"
					type="date"
					label="Data"
					change={() => {}}
					validation={{ required: false }}
				/>
				<Input
					key={2}
					id="time"
					type="time"
					label="Horas"
					change={() => {}}
					validation={{ required: false }}
				/>
				<Input
					key={3}
					id="topic"
					type="text"
					label="Tópico"
					change={() => {}}
					validation={{ required: false }}
					value="Fazer nada"
				/>
				<ParticipantsSection>
					<div>Confirmados:</div>
					<div>
						<span>A</span>
						<span>B</span>
						<span>C</span>
						<span>D</span>
					</div>
				</ParticipantsSection>
				<Button>Confirmar</Button>
			</Card>
			<Card>
				<Title>
					<span>
						<FaHandshake />
						1ª Reunião
					</span>
				</Title>
				<Input
					key={1}
					id="date"
					type="date"
					label="Data"
					change={() => {}}
					validation={{ required: false }}
				/>
				<Input
					key={2}
					id="time"
					type="time"
					label="Horas"
					change={() => {}}
					validation={{ required: false }}
				/>
				<Input
					key={3}
					id="topic"
					type="text"
					label="Tópico"
					change={() => {}}
					validation={{ required: false }}
					value="Fazer nada"
				/>
				<ParticipantsSection>
					<div>Confirmados:</div>
					<div>
						<span>A</span>
						<span>B</span>
						<span>C</span>
						<span>D</span>
					</div>
				</ParticipantsSection>
				<Button>Confirmar</Button>
			</Card>
		</Container>
	);
}

export default Meetings;

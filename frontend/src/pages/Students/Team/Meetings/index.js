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

import {
	FaHandshake,
	FaPlus,
	FaEdit,
	FaTrash,
	FaSave,
	FaTimesCircle,
} from 'react-icons/fa';

import { validate } from '../../../../validators';

const initialState = [
	{ number: 1, date: '22/01/2020', time: '10:20 PM', topic: 'Fazer nada' },
];

function Meetings() {
	const initialStage = {
		inputs: [
			{
				id: 'date',
				type: 'date',
				label: 'Data',
				value: '',
				validation: { required: false },
				valid: false,
				error: false,
				info: '',
			},
			{
				id: 'time',
				type: 'time',
				label: 'Horas',
				value: '',
				validation: { required: false },
				valid: false,
				error: false,
				info: '',
			},
			{
				id: 'topic',
				type: 'text',
				label: 'Tópico',
				value: '',
				validation: { required: false },
				valid: false,
				error: false,
				info: '',
			},
		],
		number: 1,
		confirmed_members: [
			{ username: 'fc12345', first_name: 'Ola', avatar_url: null },
		],
	};
	const [editMode, setEditMode] = useState(false);
	const [newMeetingMode, setNewMeetingMode] = useState(false);
	const [meetings, setMeetings] = useState([initialStage]);
	const [newMeetingValidity, setNewMeetingValidity] = useState(false);

	const [newMeeting, setNewMeeting] = useState([
		{
			id: 'date',
			type: 'date',
			label: 'Data',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		{
			id: 'time',
			type: 'time',
			label: 'Horas',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
		{
			id: 'topic',
			type: 'text',
			label: 'Tópico',
			value: '',
			validation: { required: true },
			valid: false,
			error: false,
			info: '',
		},
	]);

	function handleNewMeetingInputs({ value }, index) {
		const [valid, info] = validate(value, newMeeting[index].validation);
		const updatedForm = [...newMeeting];
		updatedForm[index] = {
			...newMeeting[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setNewMeeting(updatedForm);
		setNewMeetingValidity(evaluateForm(updatedForm));
	}

	function evaluateForm(meetingForm) {
		let validForm = true;
		// Evaluate Project
		for (let key in meetingForm) {
			validForm = meetingForm[key].valid && validForm;
		}
		return validForm;
	}

	function handleNewMeeting() {}

	function renderNewMeeting() {
		return (
			<Card>
				<Title>
					<span>
						<FaHandshake />
						Nova Reunião
					</span>
					<div>
						<button onClick={() => setNewMeetingMode(false)}>
							<FaTimesCircle />
						</button>
					</div>
				</Title>
				<form onSubmit={handleNewMeeting} autoComplete="off">
					{newMeeting.map((field, index) => (
						<Input
							key={field.id}
							id={field.id}
							type={field.type}
							label={field.label}
							change={({ target }) => handleNewMeetingInputs(target, index)}
							validation={{ required: true }}
						/>
					))}

					<ParticipantsSection></ParticipantsSection>
					<Button type="submit" disabled={!newMeetingValidity}>
						Agendar
					</Button>
				</form>
			</Card>
		);
	}

	function handleConfirmation() {}

	function handleMeetingInput({ value }, meeting_index, index) {
		const { inputs: meeting_fields } = { ...meetings[meeting_index] };
		const [valid, info] = validate(value, meeting_fields[index].validation);
		const updatedForm = [...meetings];
		updatedForm[meeting_index].inputs[index] = {
			...updatedForm[meeting_index].inputs[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setMeetings(updatedForm);
	}
	return (
		<Container>
			{!newMeetingMode ? (
				<MainButton
					onClick={() => {
						setNewMeetingMode(true);
					}}
				>
					<FaPlus />
					Marcar Reunião
				</MainButton>
			) : (
				<div></div>
			)}

			{newMeetingMode && renderNewMeeting()}
			{!newMeetingMode &&
				meetings.map((meeting, meeting_index) => (
					<Card key={meeting.number}>
						<Title>
							<span>
								<FaHandshake />
								{meeting.number}ª Reunião
							</span>
							<div>
								<button onClick={() => setEditMode(!editMode)}>
									{editMode ? <FaSave /> : <FaEdit />}
								</button>
								<button>
									<FaTrash />
								</button>
							</div>
						</Title>
						<form onSubmit={handleConfirmation} autoComplete="off">
							{meeting.inputs.map((key, index) => (
								<Input
									key={key.id}
									id={key.id}
									type={key.type}
									label={key.label}
									change={({ target }) =>
										handleMeetingInput(target, meeting_index, index)
									}
									validation={key.validation}
									value={key.value}
									disabled={!editMode}
								/>
							))}

							<ParticipantsSection>
								<div>Confirmados:</div>
								<div>
									{meeting.confirmed_members.map((member) =>
										member.avatar_url ? (
											<img key={member.username} />
										) : (
											<span key={member.username}>
												{member.first_name.charAt(0)}
											</span>
										)
									)}
								</div>
							</ParticipantsSection>
							{!editMode && <Button type="submit">Confirmar</Button>}
						</form>
					</Card>
				))}
		</Container>
	);
}

export default Meetings;

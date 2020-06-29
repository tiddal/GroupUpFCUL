import React, { useState } from 'react';

import moment from 'moment';
import {
	Container,
	Card,
	Title,
	NewMeetingTitle,
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

import studentService from '../../../../services/student';
import { ButtonSpinner } from '../../../../components/Spinner';

function Meetings({
	course,
	unit,
	project,
	team,
	meetings,
	setMeetings,
	user,
}) {
	const [editMode, setEditMode] = useState({ status: false });
	const [newMeetingMode, setNewMeetingMode] = useState(false);
	const [newMeetingValidity, setNewMeetingValidity] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editMeetings, setEditMeetings] = useState(meetings);
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
		for (let key in meetingForm) {
			validForm = meetingForm[key].valid && validForm;
		}
		return validForm;
	}

	async function handleNewMeeting(event) {
		event.preventDefault();
		if (!newMeetingValidity) return;
		setLoading(true);
		const meetingData = {};
		newMeeting.map((field) => (meetingData[field.id] = field.value));
		meetingData.begins_at = moment(
			meetingData.date + ' ' + meetingData.time
		).format();
		meetingData.ends_at = meetingData.begins_at;
		delete meetingData.time;
		delete meetingData.date;
		const [response, status] = await studentService.create.meeting(
			course,
			unit,
			'2019-2020',
			project,
			team,
			{ meeting: meetingData }
		);
		if (status !== 201) return;
		const updatedMeetings = [
			...meetings,
			{
				number: response.meeting_number,
				confirmed_members: [],
				inputs: [
					{
						id: 'date',
						type: 'date',
						label: 'Data',
						value: response.begins_at.split('T')[0],
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
					{
						id: 'time',
						type: 'time',
						label: 'Horas',
						value: moment(response.begins_at).format('HH:mm'),
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
					{
						id: 'topic',
						type: 'text',
						label: 'Tópico',
						value: response.topic,
						validation: { required: false },
						valid: false,
						error: false,
						info: '',
					},
				],
			},
		];
		setLoading(false);
		setNewMeetingMode(false);
		setNewMeetingValidity(false);
		setMeetings(updatedMeetings);
		setEditMeetings(updatedMeetings);
	}

	function renderNewMeeting() {
		return (
			<Card>
				<NewMeetingTitle>
					<FaHandshake />
					<span>Nova Reunião</span>
					<div>
						<button onClick={() => setNewMeetingMode(false)}>
							<FaTimesCircle />
						</button>
					</div>
				</NewMeetingTitle>
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
					<Button type="submit" disabled={!newMeetingValidity}>
						{loading ? <ButtonSpinner /> : 'Agendar'}
					</Button>
				</form>
			</Card>
		);
	}

	async function handleConfirmation(event, meeting) {
		event.preventDefault();
		const userInMeeting = meeting.confirmed_members.find(
			(member) => member.username === user.username
		);
		let updatedMeeting;
		if (!userInMeeting) {
			updatedMeeting = {
				...meeting,
				confirmed_members: [...meeting.confirmed_members, user],
			};
			const [, status] = await studentService.create.meetingMember(
				course,
				unit,
				'2019-2020',
				project,
				team,
				meeting.number
			);
			if (status !== 201) return;
		} else {
			updatedMeeting = {
				...meeting,
				confirmed_members: meeting.confirmed_members.filter(
					(member) => member.username !== user.username
				),
			};
			const [, status] = await studentService.remove.meetingMember(
				course,
				unit,
				'2019-2020',
				project,
				team,
				meeting.number
			);
			if (status !== 204) return;
		}
		const updatedMeetings = meetings.map((m) =>
			m.number === meeting.number ? updatedMeeting : m
		);
		setMeetings(updatedMeetings);
		setEditMeetings(updatedMeetings);
	}

	function handleMeetingInput({ value }, meeting_index, index) {
		const { inputs: meeting_fields } = { ...editMeetings[meeting_index] };
		const [valid, info] = validate(value, meeting_fields[index].validation);
		const updatedForm = [...editMeetings];
		updatedForm[meeting_index].inputs[index] = {
			...updatedForm[meeting_index].inputs[index],
			value,
			valid,
			error: !valid,
			info,
		};
		setEditMeetings(updatedForm);
	}

	async function handleEditMeeting(meeting_number) {
		if (editMode.status === false) {
			setEditMode({ status: true, meeting: meeting_number });
		} else {
			const edited_meeting = editMeetings.find(
				(meeting) => meeting.number === meeting_number
			);
			const meetingData = {};
			edited_meeting.inputs.map(
				(field) => (meetingData[field.id] = field.value)
			);
			meetingData.begins_at = moment(
				meetingData.date + ' ' + meetingData.time
			).format();
			meetingData.ends_at = meetingData.begins_at;
			delete meetingData.time;
			delete meetingData.date;
			const [, status] = await studentService.update.meeting(
				course,
				unit,
				'2019-2020',
				project,
				team,
				meeting_number,
				{ meeting: meetingData }
			);
			if (status !== 200) return;
			setEditMode({ status: false });
		}
	}

	async function handleRemoveMeeting(meeting_number) {
		const [, status] = await studentService.remove.meeting(
			course,
			unit,
			'2019-2020',
			project,
			team,
			meeting_number
		);
		if (status !== 204) return;
		const updatedMeetings = meetings.filter(
			(meeting) => meeting.number !== meeting_number
		);
		setMeetings(updatedMeetings);
		setEditMeetings(updatedMeetings);
	}

	return (
		<Container>
			{!newMeetingMode && (
				<MainButton
					onClick={() => {
						setNewMeetingMode(true);
					}}
				>
					<FaPlus />
					Marcar Reunião
				</MainButton>
			)}

			{newMeetingMode && renderNewMeeting()}
			{!newMeetingMode &&
				meetings.map((meeting, meeting_index) => (
					<Card key={meeting.number}>
						<Title>
							<FaHandshake />
							<span>{meeting.number}ª Reunião</span>
							<div>
								<button onClick={() => handleEditMeeting(meeting.number)}>
									{editMode.status && editMode.meeting === meeting.number ? (
										<FaSave />
									) : (
										<FaEdit />
									)}
								</button>
								<button onClick={() => handleRemoveMeeting(meeting.number)}>
									<FaTrash />
								</button>
							</div>
						</Title>
						<form
							onSubmit={(event) => handleConfirmation(event, meeting)}
							autoComplete="off"
						>
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
									disabled={editMode.meeting !== meeting.number}
								/>
							))}

							<ParticipantsSection>
								<div>Confirmados:</div>
								<div>
									{meeting.confirmed_members.map((member) =>
										member.avatar_url ? (
											<img key={member.username} alt="member" />
										) : (
											<span key={member.username}>
												{member.first_name.charAt(0)}
											</span>
										)
									)}
								</div>
							</ParticipantsSection>
							{editMode.meeting !== meeting.number && (
								<Button type="submit">
									{meeting.confirmed_members.some(
										(member) => member.username === user.username
									)
										? 'Não vou'
										: 'Confirmar'}
								</Button>
							)}
						</form>
					</Card>
				))}
		</Container>
	);
}

export default Meetings;

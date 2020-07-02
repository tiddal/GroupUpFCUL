import React from 'react';
import Rating from '../../../../components/Rating';

import {
	Container,
	Member,
	Section,
	MemberInfo,
	MembersOptions,
	PendingUsersOptions,
	RateMember,
	LeaveButton,
} from './styles';

import {
	FaStar,
	FaStarHalf,
	FaCrown,
	FaCheck,
	FaTimes,
	FaBan,
	FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../../../hooks';

function Members({ team, handlers }) {
	const { user } = useAuth();

	function renderRate(rate) {
		if (!rate)
			return [...Array(5)].map((star, i) => (
				<FaStar key={i} color={'#AAAAAA'} />
			));
		const decimalPart = parseInt((rate % 1).toFixed(1).substring(2));
		const integerPart = parseInt(rate);
		const stars = [...Array(integerPart)];
		if (decimalPart === 0)
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
				</React.Fragment>
			);
		if (decimalPart <= 5) {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStarHalf />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					{stars.map((star, i) => (
						<FaStar key={i} />
					))}
					<FaStar />
				</React.Fragment>
			);
		}
	}

	function getCurrentRate(username) {
		const ratedMember = team.teamRatings.find(
			(member) => member.username === username
		);
		if (!ratedMember) return null;
		return ratedMember.rate;
	}

	return (
		<Container>
			<Section>
				<span>
					Membros: ({team.members.length}/{team.max_members})
				</span>
				{team.members.map((member, index) => (
					<Member key={member.username}>
						{member.avatar_url ? (
							<img src={member.avatar_url} alt="foto de perfil" />
						) : (
							<span>{member.first_name.charAt(0)}</span>
						)}
						<MemberInfo to={`/profile/${member.username}`}>
							<p>
								{member.first_name} {member.last_name.split(' ').pop()}
							</p>
							<p>{member.username}</p>
							<p>{renderRate(member.rating)}</p>
						</MemberInfo>

						{index === 0 ? (
							<MembersOptions>
								<div>
									<FaCrown />
								</div>
							</MembersOptions>
						) : (
							team.owner.username === user.username && (
								<MembersOptions>
									<button onClick={() => handlers.handleKickMember(member)}>
										<FaBan />
									</button>
								</MembersOptions>
							)
						)}
					</Member>
				))}
			</Section>
			{team.members.length > 1 && (
				<Section>
					<span>Avaliar prestação dos colegas:</span>
					{team.members.map(
						(member) =>
							member.username !== user.username && (
								<Member key={member.username}>
									{member.avatar_url ? (
										<img src={member.avatar_url} alt="foto de perfil" />
									) : (
										<span>{member.first_name.charAt(0)}</span>
									)}
									<RateMember>
										<p>
											{member.first_name} {member.last_name.split(' ').pop()}
										</p>
										<div>
											<Rating
												currentRating={getCurrentRate(member.username)}
												action={handlers.handleRate}
												instance={member.username}
											/>
										</div>
									</RateMember>
								</Member>
							)
					)}
				</Section>
			)}
			{team.pendingMembers.length > 0 && (
				<Section>
					<span>Pedidos pendentes:</span>
					{team.pendingMembers.map((member) => (
						<Member key={member.username}>
							{member.avatar_url ? (
								<img src={member.avatar_url} alt="foto de perfil" />
							) : (
								<span>{member.first_name.charAt(0)}</span>
							)}
							<MemberInfo to={`/profile/${member.username}`}>
								<p>
									{member.first_name} {member.last_name.split(' ').pop()}
								</p>
								<p>{member.username}</p>
								<p>{renderRate(member.rating)}</p>
							</MemberInfo>
							{team.owner.username === user.username && (
								<PendingUsersOptions>
									<button onClick={() => handlers.handleAcceptRequest(member)}>
										<FaCheck />
									</button>
									<button onClick={() => handlers.handleRejectRequest(member)}>
										<FaTimes />
									</button>
								</PendingUsersOptions>
							)}
						</Member>
					))}
				</Section>
			)}
			<LeaveButton
				onClick={handlers.handleLeaveTeam}
				disabled={
					team.owner.username === user.username && team.members.length > 1
				}
			>
				<FaSignOutAlt />
				Sair do Grupo
			</LeaveButton>
		</Container>
	);
}

export default Members;

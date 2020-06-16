import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

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
						<MemberInfo>
							<p>
								{member.first_name} {member.last_name.split(' ').pop()}
							</p>
							<p>{member.username}</p>
							<p>
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStarHalf />
							</p>
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
											{member.first_name} {member.last_name.split(' ').pop()}{' '}
											<span>{member.username}</span>
										</p>
										<div>
											<StarRatingComponent
												name="memberRating"
												value={3}
												starColor="#f2b01e"
												emptyStarColor="#999"
												renderStarIcon={() => <FaStar />}
												editing={true}
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
							<MemberInfo>
								<p>
									{member.first_name} {member.last_name.split(' ').pop()}
								</p>
								<p>{member.username}</p>
								<p>
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStarHalf />
								</p>
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

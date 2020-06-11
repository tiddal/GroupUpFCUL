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

function Members() {
	return (
		<Container>
			<Section>
				<span>Membros: (2/8)</span>
				<Member>
					<span>S</span>
					<MemberInfo>
						<p>Student Test</p>
						<p>fc00001</p>
						<p>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStarHalf />
						</p>
					</MemberInfo>
					<MembersOptions>
						<div>
							<FaCrown />
						</div>
					</MembersOptions>
				</Member>
				<Member>
					<span>S</span>
					<MemberInfo>
						<p>Student Test</p>
						<p>fc00001</p>
						<p>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStarHalf />
						</p>
					</MemberInfo>
					<MembersOptions>
						<button>
							<FaBan />
						</button>
					</MembersOptions>
				</Member>
			</Section>
			<Section>
				<span>Avaliar prestação dos colegas:</span>
				<Member>
					<span>S</span>
					<RateMember>
						<p>
							Student Test <span>fc00001</span>
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
			</Section>
			<Section>
				<span>Pedidos pendentes:</span>
				<Member>
					<span>S</span>
					<MemberInfo>
						<p>Student Test</p>
						<p>fc00001</p>
						<p>
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStar />
							<FaStarHalf />
						</p>
					</MemberInfo>
					<PendingUsersOptions>
						<button>
							<FaCheck />
						</button>
						<button>
							<FaTimes />
						</button>
					</PendingUsersOptions>
				</Member>
			</Section>
			<LeaveButton>
				<FaSignOutAlt />
				Sair do Grupo
			</LeaveButton>
		</Container>
	);
}

export default Members;

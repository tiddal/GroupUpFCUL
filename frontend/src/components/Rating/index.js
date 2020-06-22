import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import { Container } from './styles';

function Rating({ currentRating, action, instance }) {
	const [rating, setRating] = useState(currentRating || null);
	const [hover, setHover] = useState(null);

	function handleClick(value) {
		setRating(value);
		action(instance, value);
	}

	return (
		<Container>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;
				return (
					<label key={i}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => handleClick(ratingValue)}
						></input>
						<FaStar
							className="star"
							color={ratingValue <= (hover || rating) ? '#ffc107' : '#AAAAAA'}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						></FaStar>
					</label>
				);
			})}
		</Container>
	);
}

export default Rating;

import React, { useState } from 'react';
import S from "../../../css/rating.module.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaThumbsUp } from "react-icons/fa"

const RatingThumbs = (props) => {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;

				return (
					<label>
						<input type="radio" name="rating" value={ratingValue} onClick={() => {
							props.clickHandler(ratingValue)
							setRating(ratingValue)
							console.log(ratingValue)
						}} />
						<FaThumbsUp className={S.thumb} color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={30} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} />
					</label>
				)
			})}
		</div>
	)
}

export default RatingThumbs;










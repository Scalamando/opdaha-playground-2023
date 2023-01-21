import axios from "axios";

export type UserRating = {
	id: number;
	rating: number;
	title: string;
	content: string;
};

type UserRatingResponse = {
	id: number;
	attributes: {
		rating: number;
		title: string;
		content: string;
	};
};

function transformStrapiUserRatingResponse(reviewResponse: UserRatingResponse): UserRating {
	return {
		id: reviewResponse.id,
		rating: reviewResponse.attributes.rating,
		title: reviewResponse.attributes.title,
		content: reviewResponse.attributes.content,
	};
}

export async function useStationUserRating(stationId: number) {
	const response = await axios.get<{ data: UserRatingResponse[] }>(
		import.meta.env.VITE_APP_API_URL +
			`/api/userratings?filters[playground][id][$eq]=${stationId}populate[0]=playground`
	);

	if (response.status === 200) {
		return response.data.data.map(transformStrapiUserRatingResponse);
	}

	return [];
}

export async function sendUserRating(rating: number, title: string, content: string) {
	const response = await axios.post(import.meta.env.VITE_APP_API_URL + "/api/userratings", {
		data: {
			rating,
			title,
			content,
		},
	});

	if (response.status !== 201) {
		return { error: true };
	}

	return response.data.data;
}

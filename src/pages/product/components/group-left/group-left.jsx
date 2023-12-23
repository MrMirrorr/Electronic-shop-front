import { Icon } from '../../../../components';
import styled from 'styled-components';

const GroupLeftContainer = ({ className, imageUrl, title }) => {
	return (
		<div className={className}>
			{imageUrl ? (
				<img src={imageUrl} alt={title} />
			) : (
				<Icon id="fa-picture-o" size="300px" color="#cccccc" />
			)}
		</div>
	);
};

export const GroupLeft = styled(GroupLeftContainer)`
	flex-basis: 45%;
`;

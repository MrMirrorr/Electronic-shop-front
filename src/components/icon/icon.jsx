import styled from 'styled-components';

const IconContainer = ({
	className,
	id,
	maxHeight,
	margin,
	padding,
	size,
	color,
	clickable,
	...props
}) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	display: inline-flex;
	margin: ${({ margin = '0' }) => margin};
	padding: ${({ padding = '0' }) => padding};
	max-height: ${({ maxHeight = 'none' }) => maxHeight};
	font-size: ${({ size = '24px' }) => size};
	font-weight: 300;
	color: ${({ disabled, color }) => (disabled ? '#ccc' : color)};
	transition: transform 0.2s linear;

	&:hover {
		${({ disabled = false, clickable = false }) =>
			!disabled && clickable
				? 'animation: jump;	animation-duration: 0.7s; cursor: pointer;'
				: ''}
	}

	@keyframes jump {
		0% {
			transform: initial;
		}
		25% {
			transform: rotate(-10deg);
		}
		50% {
			transform: rotate(10deg);
		}
		75% {
			transform: rotate(0);
		}
	}
`;

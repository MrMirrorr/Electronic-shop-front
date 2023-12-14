import styled from 'styled-components';

const ButtonContainer = ({ className, children, uppercase = false, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width = 'auto' }) => width};
	height: ${({ height = 'auto' }) => height};
	font-size: ${({ fontSize = '16px' }) => fontSize};
	font-weight: ${({ fontWeight = '400' }) => fontWeight};
	color: ${({ color = 'inherit' }) => color};
	background-color: ${({ bgColor = '#ccc' }) => bgColor};
	border: ${({ border = 'none' }) => border};
	border-radius: ${({ radius = '0' }) => radius};
	${({ uppercase }) => uppercase && 'text-transform: uppercase'};
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	&:hover {
		color: ${({ bgColor = '#ccc' }) => bgColor};
		background-color: ${({ color = 'inherit' }) => color};
	}
`;

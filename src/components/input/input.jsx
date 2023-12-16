import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	padding: 10px 20px;
	border-radius: 5px;
	border: 1px solid #000;
	background: #fff;
`;

import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(
	({ className, children, variant = 'text', id = '', label = null, ...props }, ref) => {
		if (variant === 'text') {
			return label ? (
				<div className={className}>
					<label htmlFor={id}>{label}</label>
					<input type="text" id={id} {...props} ref={ref} />
				</div>
			) : (
				<div className={className}>
					<input type="text" className={className} {...props} ref={ref} />
				</div>
			);
		}

		if (variant === 'select') {
			return label ? (
				<div className={className}>
					<label htmlFor={id}>{label}</label>
					<select id={id} {...props} ref={ref}>
						{children}
					</select>
				</div>
			) : (
				<div className={className}>
					<select id={id} {...props} ref={ref}>
						{children}
					</select>
				</div>
			);
		}

		if (variant === 'number') {
			return label ? (
				<div className={className}>
					<label htmlFor={id}>{label}</label>
					<input type="number" id={id} {...props} ref={ref} />
				</div>
			) : (
				<div className={className}>
					<input type="number" id={id} {...props} ref={ref} />
				</div>
			);
		}

		if (variant === 'textarea') {
			return label ? (
				<div className={className}>
					<label htmlFor={id}>{label}</label>
					<textarea id={id} {...props} ref={ref} />
				</div>
			) : (
				<div className={className}>
					<textarea id={id} {...props} ref={ref} />
				</div>
			);
		}
	},
);

export const Input = styled(InputContainer)`
	input {
		width: 100%;
		padding: 10px 20px;
		border-radius: 5px;
		border: 1px solid #000;
		background: #fff;
	}

	textarea,
	select {
		width: 100%;
		padding: 10px 20px;
		border-radius: 5px;
		border: 1px solid #000;
		background: #fff;
	}

	${({ label }) => label && 'display: flex; flex-direction: column; gap: 5px;'}
`;

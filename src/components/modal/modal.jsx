import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/ui';
import { selectModal } from '../../redux/selectors';
import { getFunctionById } from '../../redux/utils';
import { Button } from '../../components';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { isOpen, text, onConfirmId, onConfirmParams } = useSelector(selectModal);

	const onConfirm = () => {
		const onConfirmAction = getFunctionById(onConfirmId);
		if (onConfirmId && onConfirmAction && typeof onConfirmAction === 'function') {
			dispatch(onConfirmAction(onConfirmParams));
		}
		dispatch(closeModal());
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button
						width="150px"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						onClick={onConfirm}
					>
						Да
					</Button>
					<Button
						width="150px"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						onClick={() => dispatch(closeModal())}
					>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 200;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.box {
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		text-align: center;
		position: relative;
		top: 50%;
		z-index: 300;
		transform: translateY(-50%);
		background-color: #fff;
		border: 3px solid #000;
		border-radius: 5px;

		.buttons {
			display: flex;
			justify-content: center;

			button {
				margin: 0 5px;
			}
		}
	}
`;

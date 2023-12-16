import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/ui';
import { selectIsAdmin } from '../../redux/selectors';
import { formatDateString } from '../../redux/utils';
import { Icon } from '../../components';
import styled from 'styled-components';
import { FUNCTION_ID } from '../../redux/constants/function-id';

const CommentContainer = ({
	className,
	id: commentId,
	productId,
	author,
	content,
	createdAt,
}) => {
	const dispatch = useDispatch();
	const isAdmin = useSelector(selectIsAdmin);

	const onCommentRemove = (productId, commentId) => {
		const commentData = { productId, commentId };

		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirmId: FUNCTION_ID.REMOVE_COMMENT_ASYNC,
				onConfirmParams: commentData,
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment">
				<div className="info-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" margin="0 10px 0 0" size="18px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
						{formatDateString(createdAt)}
					</div>
				</div>
				<div className="text-content">{content}</div>
			</div>
			{isAdmin && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					size="18px"
					color="#ff2c2c"
					maxHeight="18px"
					clickable={true}
					onClick={() => onCommentRemove(productId, commentId)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	.comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	.info-panel {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.author {
		display: flex;
	}

	.published-at {
		display: flex;
		width: 180px;
	}
`;

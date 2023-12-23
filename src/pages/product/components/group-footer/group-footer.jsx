import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentAsync } from '../../../../redux/actions';
import { AlertError, Comment, Icon } from '../../../../components';
import styled from 'styled-components';

const GroupFooterContainer = ({
	className,
	description,
	comments,
	isLoading,
	error,
	id: productId,
}) => {
	const [activeTab, setActiveTab] = useState(1);
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	const onNewCommentAdd = (productId, newComment) => {
		const newCommentData = { productId, newComment };
		dispatch(addCommentAsync(newCommentData)).then(() => setNewComment(''));
	};

	return (
		<div className={className}>
			<div className="tab-buttons">
				<div
					className={activeTab === 1 ? 'tab-button active' : 'tab-button'}
					onClick={() => handleTabClick(1)}
				>
					Описание и характеристики
				</div>
				<div
					className={activeTab === 2 ? ' tab-button active' : 'tab-button'}
					onClick={() => handleTabClick(2)}
				>
					Отзывы
				</div>
			</div>

			<div className="tab-content">
				<p
					className={`tab-content-item description-content${
						activeTab === 1 ? ' active' : ''
					}`}
				>
					{description}
				</p>
				<div
					className={`tab-content-item reviews-content${
						activeTab === 2 ? ' active' : ''
					}`}
				>
					<div className="new-comment">
						<textarea
							name="comment"
							value={newComment}
							placeholder="Комментарий..."
							onChange={({ target }) => setNewComment(target.value)}
						></textarea>
						<Icon
							id={
								isLoading
									? 'fa-spinner fa-pulse fa-fw'
									: 'fa-paper-plane-o'
							}
							maxHeight="22px"
							margin="0 0 0 10px"
							size="22px"
							clickable={!isLoading}
							disabled={isLoading}
							onClick={() => onNewCommentAdd(productId, newComment)}
						/>
					</div>
					{error && <AlertError>{error}</AlertError>}
					<div className="comments">
						{comments ? (
							comments.map(
								({ id, avatarUrl, author, content, createdAt }) => (
									<Comment
										key={id}
										id={id}
										author={author}
										avatarUrl={avatarUrl}
										content={content}
										createdAt={createdAt}
										productId={productId}
										isLoading={isLoading}
									/>
								),
							)
						) : (
							<div className="empty-comments">
								Вы можете стать первым, кто оставит здесь комментарий...
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const GroupFooter = styled(GroupFooterContainer)`
	flex-basis: 100%;

	.tab-buttons {
		display: flex;
		gap: 30px;
		margin-bottom: 30px;
		padding: 10px 0;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;

		.tab-button {
			cursor: pointer;
			user-select: none;

			&.active {
				text-decoration: underline;
				text-underline-offset: 11px;
				text-decoration-thickness: 3px;
			}
		}
	}

	.tab-content {
		.tab-content-item {
			opacity: 0;
			transition: opacity 0.5s linear;
			max-height: 0;
			overflow: hidden;

			&.active {
				opacity: 1;
				max-height: 1000px;
				transition:
					opacity 0.5s linear,
					max-height 0.5s ease-in-out;
			}
		}

		.description-content {
			margin: 0;
		}

		.reviews-content {
			.new-comment {
				display: flex;
				width: 100%;
				height: 120px;

				textarea {
					width: 550px;
					padding: 15px;
					resize: none;
					font-size: 16px;
				}
			}
		}
	}
`;

export const Title = ({ title = "Title", children }) => {
	return (
		<h2 className="p-1  title">
			<strong>{title}{children}</strong>
		</h2>
	);
};

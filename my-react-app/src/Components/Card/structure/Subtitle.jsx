export const Subtitle = ({ title = "Title", children }) => {
	return (
		<h3 className="p-1  ">
			<strong>{title}{children}</strong>
		</h3>
	);
};

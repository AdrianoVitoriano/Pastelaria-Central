export const Link = ({ href = "#", title,active,children }) => {
	return (
		<li className="navigation-list mb-3">
			<a className={`list-link ${active?"active":""}`} href={href}>
				<span className="list-icon">{children}</span>
				<span className="list-title">{title}</span>
			</a>
		</li>
	);
};

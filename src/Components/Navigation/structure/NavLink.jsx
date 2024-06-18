import { Link } from "react-router-dom";

export const NavLink = ({ href = "#", title,active,children }) => {
	return (
		<li className="navigation-list mb-3">
			<Link className={`list-link ${active?"active":""}`} to={href}>
				<span className="list-icon">{children}</span>
				<span className="list-title">{title}</span>
			</Link>
		</li>
	);
};

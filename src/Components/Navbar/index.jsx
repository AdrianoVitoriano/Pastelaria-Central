import "./style.css";

export const Navbar = () => {
	return (
		<>
			<header className="header-navbar sticky-top">
				<div className="container-fluid shadow-sm text-center">
					<a className="text-decoration-none display-5 textTitulo ">
						<img src="./Logo-Pastel.png" alt="" className="imgLogo" />
						Pastelaria Central
					</a>
				</div>
			</header>
		</>
	);
};

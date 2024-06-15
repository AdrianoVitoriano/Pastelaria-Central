export const Root = ({ children }) => {
	return (
		<div className="col-12 col-lg-4 ">
			<div className="card m-3  rounded-5">
				{children}
			</div>
		</div>
	);
};

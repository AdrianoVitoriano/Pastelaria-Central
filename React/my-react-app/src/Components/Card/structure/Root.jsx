export const Root = ({colNumber, hover = false, children }) => {
	return (
		<div className={`col${isNaN(colNumber)?"":"-6"} ${isNaN(colNumber)?"":"col-lg-"+colNumber}`}>
			<div className={`card ${hover?"hover-action":""} m-3  rounded-5`}>
				{children}
			</div>
		</div>
	);
};

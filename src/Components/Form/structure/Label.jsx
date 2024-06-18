export const Label = ({value, onchange, clas ="", onlyField = false, label, type, placeholder }) => {
	if (onlyField) {
		return (
				<input onchange={onchange} type={type} className={`form-control form-control-sm ${clas}`} id={`id${label}`} placeholder={placeholder} />

		);
	} else {
		return (
			<div className="form-group">
				<label className="h4" htmlFor={`id${label}`}>
					{label}
				</label>
				<input value={value} type={type} className="form-control" id={`id${label}`} placeholder={placeholder} />
			</div>
		);
	}
};

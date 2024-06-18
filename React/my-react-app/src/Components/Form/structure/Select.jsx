export const Select = ({label, defaultText, children }) => {
	return (
		<>
		<label className="h4" htmlFor={`id${label}`}>{label}</label>
		<select class="form-select" aria-label={defaultText} id={`id${label}`}>
			{children}
		</select>
		</>
	);
};

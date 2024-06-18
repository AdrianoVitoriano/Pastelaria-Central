export const Options = ({ selected, value, text }) => {
	if (selected) {
		return (
			<option value={value} selected>
				{text}
			</option>
		);
	} else {
		return <option value={value}>{text}</option>;
	}
};

export const Accordion = (props) => {
	return (		
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={"#" + props.collapseId}
						aria-expanded="false"
						aria-controls={props.collapseId}
					>
						{props.title}
					</button>
					{console.log(props)}
				</h2>
				<div id={props.collapseId} className="accordion-collapse collapse show" data-bs-parent="#MenuAccordion">
                    <div className="accordion-body">
                        {
                            //     <div className="list-group">
                            props.items.map((item) => {
                                return(
                                    <a href={item.url} className="list-group-item list-group-item-action">
                                        {item.text}
                                    </a>
                                )
                            })
                        }
                    </div>
				</div>
			</div>
	);
};

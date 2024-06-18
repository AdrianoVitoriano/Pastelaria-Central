import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";

export const Comandas = () => {
	const [comandas, setComandas] = useState([]);
	useEffect(() => {
		fetch(`${route}/comandas-abertas`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setComandas(data) 
			})
			.catch((error) => {});
	}, []);
	return (
		<>
			<div className="container text-center">
				<div className="row text-center">
					{comandas.map((comanda) => {
						return (
							<>
								<Card.Root colNumber={4} hover={true}>
									<Card.Title title={`Comanda: ${comanda.id}`}>
										<Card.Badge bgColor={comanda.aberta ? "bg-success" : "bg-danger"} />
									</Card.Title>

									<Card.Body>
										<Card.Details text={comanda.data} />
										<Card.Details name={"Mesa"} text={comanda.idMesa} />
										<Card.Details name={"Total"} text={`R$${comanda.total ? comanda.total : "00,00"}`} />
										<Card.Buttons>
											<Card.Button action={() => {}} title={"Alterar"} />
											<Card.Button href={`/comandas/${comanda.id}`} title={"Visualizar"} />
										</Card.Buttons>
									</Card.Body>
								</Card.Root>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};

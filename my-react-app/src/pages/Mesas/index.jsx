import { useState, useEffect } from "react";
import { route } from "../../../route";
import { Card } from "../../Components/Card/structure";

const mesaList = [
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
	{
		id: 1,
		comanda: 5,
		status: true,
		total: 50,
	},
];

export const Mesas = () => {
	const [mesas, setMesas] = useState([]);
	useEffect(() => {
		fetch(`${route}/mesas-comandas`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMesas(data);
			})
			.catch((error) => {});
	}, []);

	return (
		<>
			<div className="container text-center">
				<div className="row text-center">
					<Card.Root colNumber={4} hover={true}>
						<Card.Title title={`Opções`}></Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button  href={"/mesas/cadastro"} title="Nova Mesa"/>
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{mesas.map((mesa) => {
						return (
							<>
								<Card.Root colNumber={4} hover={true}>
									<Card.Title title={`Mesa: ${mesa.id}`}>
										<Card.Badge bgColor={mesa.status ? "bg-danger" : "bg-success"} />
									</Card.Title>

									<Card.Body>
									<Card.Details text={mesa.localizacao} />
										{mesa.status ? (
											<>
												<Card.Details name={"Comanda"} text={mesa.comanda} />
												<Card.Details name={"Total"} text={`R$${mesa.total ? mesa.total : "00,00"}`} />
												<Card.Buttons>
													<Card.Button href={`/pedidos/cadastro/${mesa.id}`} title={"Novo pedido"} />
													<Card.Button href={`/comandas/${mesa.comanda}`} title={"Ver comanda"} />
												</Card.Buttons>
											</>
										) : (
											<>
												<Card.Details name={"Status"} text={`Aberta`} />
												<Card.Buttons>
													<Card.Button action={() => {}} title={"Novo pedido"} />
												</Card.Buttons>
											</>
										)}
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

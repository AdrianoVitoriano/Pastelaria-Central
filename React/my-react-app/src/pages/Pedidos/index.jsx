import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
export const Pedidos = () => {
	const [pedidos, setPedidos] = useState([]);
	useEffect(() => {
		fetch(`${route}/pedidos-abertos`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setPedidos(data);
			})
			.catch((error) => {});
	}, []);
	return (
		<>
			<div class="container text-center">
				<div className="row text-center">
				<Card.Root>
						<Card.Title title={`Opções`}>
						</Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button action={() => {}} title={"Novo Pedido"} />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{pedidos.map((pedido) => {
						return (
							<>
								<Card.Root>
									<Card.Title title={`Pedido: ${pedido.id}`}>
										<Card.Badge bgColor={pedido.status ? "bg-danger" : "bg-success"} />
									</Card.Title>
									<Card.Body>
										<Card.Details text={pedido.data} />
										<Card.Details name={"Comanda"} text={pedido.idComanda} />
										<Card.Details name={"Mesa"} text={pedido.idMesa} />
										<Card.Details name={"Total"} text={`R$${pedido.total ? pedido.total : "00,00"}`} />
										<Card.Buttons>
											<Card.Button action={() => {}} title={"Alterar"} />
											<Card.Button action={() => {}} title={"Visualizar"} />
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

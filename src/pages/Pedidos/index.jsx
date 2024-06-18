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
	async function finalizarPedido(arg) {
		try {
			const id = parseInt(arg.target.id);
			const responsePedido = await fetch(`${route}/pedidos/${id}`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					finalizado: 1,
				}),
			});
			if (!responsePedido.ok) {
				throw new Error("Falha ao finalizar o pedido");
			}

			alert("Pedido finalizado com sucesso!");
			window.location.reload();
		} catch (error) {
			alert(`Erro ao finalizar o pedido: ${error.message}`);
		}
	}
	return (
		<>
			{pedidos.length === 0 && <><h1 className="text-center title">Nenhum pedido</h1> <hr/></>}
			<div className="container text-center">
				<div className="row text-center">
				<Card.Root colNumber={4} hover={true}>
						<Card.Title title={`Opções`}>
						</Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button href={"/pedidos/cadastro"} title={"Novo Pedido"} />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{pedidos.map((pedido) => {
						return (
							<>
								<Card.Root colNumber={4} hover={true}>
									<Card.Title title={`Pedido: ${pedido.id}`}>
										<Card.Badge bgColor={pedido.status ? "bg-danger" : "bg-success"} />
									</Card.Title>
									<Card.Body>
										<Card.Details text={pedido.data} />
										<Card.Details name={"Comanda"} text={pedido.idComanda} />
										<Card.Details name={"Mesa"} text={pedido.idMesa} />
										<Card.Details name={"Total"} text={`R$${pedido.total ? pedido.total : "00,00"}`} />
										<Card.Buttons>
											<Card.Button action={finalizarPedido} id={pedido.id} title={"Finalizar"} />
											<Card.Button href={`/pedidos/${pedido.id}`} title={"Visualizar"} />
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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
import { Table } from "../../Components/Table/structure";

export const VisualizarPedido = () => {
	const Navigate = useNavigate();
	const { id } = useParams();
	const [pedido, setPedido] = useState();
	useEffect(() => {
		fetch(`${route}/pedidos/${id}`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setPedido(data);

			})
			.catch((error) => {});
	}, []);

	async function FecharPedido(arg) {
		try {
			const response = await fetch(`${route}/pedidos/${arg.target.id}`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					finalizado: 1,
				}),
			});
			if (response.ok) {
				alert(`Pedido finalizado com sucesso!`);
				return Navigate("/pedidos");
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao finalizar o pedido: ${errorResponse.message}`);
			}
		} catch (error) {
			alert(`Erro ao fechar a comanda: ${error.message}`);
		}
	}

	return (
		<>
			<div className="container text-center">
				<div className="row text-center">
					{
						<>
							<Card.Root colNumber={12}>
								<Card.Title title={`Pedido: ${pedido?.id} - Mesa ${pedido?.idMesa}`}>
									<Card.Badge bgColor={pedido?.finalizado ? "bg-success" : "bg-danger"} />
								</Card.Title>
								<hr className="m-0" />
								<Card.Body>
									<Table.Root>
										<Table.Thead>
											<Table.Tr>
												<Table.Th title="#" />
												<Table.Th title="Produto" />
												<Table.Th title="Quantidade" />
												<Table.Th title="Subtotal" />
												<Table.Th title="Cozinha" />
											</Table.Tr>
										</Table.Thead>
										{pedido?.itensPedidos.map((item, index) => {
											return (
												<Table.Tr key={index}>
													<Table.Td title={index + 1} id={`IndexItem-${item.id}`} />
													<Table.Td title={item.nome} id={`NomeItem-${item.id}`} />
													<Table.Td clas="text-center" title={item.quantidade} id={`QuantidadeItem-${item.id}`} />
													<Table.Td title={`R$${item.subtotal}`} id={`SubtotalItem-${item.id}`} />
													<Table.Td id={`CozinhaItem-${item.id}`}>
														{item.cozinha === 0 ? (
															<ion-icon name="close-outline"></ion-icon>
														) : (
															<ion-icon name="checkmark-outline"></ion-icon>
														)}
													</Table.Td>
												</Table.Tr>
											);
										})}

										<Table.Tfoot>
											<Table.Tr>
												<Table.Td clas={"text-center"} title={`Data entrada: ${pedido?.data}`} />
												<Table.Td title="" />
												<Table.Td title="Total:" />
												<Table.Td title={`R$${pedido?.total}`} />
											</Table.Tr>
										</Table.Tfoot>
									</Table.Root>
									<Card.Buttons>
										<Card.Button action={FecharPedido} id={pedido?.id} title={"Finalizar pedido"} />
									</Card.Buttons>
								</Card.Body>
							</Card.Root>
						</>
					}
				</div>
			</div>
		</>
	);
};

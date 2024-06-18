import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
import { Table } from "../../Components/Table/structure";

export const VisualizarComanda = () => {
	const { id } = useParams();
	const [comanda, setComandas] = useState();
	useEffect(() => {
		fetch(`${route}/comandas/${id}`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setComandas(data);
			})
			.catch((error) => {});
	}, []);

	async function FecharComanda(arg) {
		try {
			const response = await fetch(`${route}/comandas/${arg.target.id}`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					aberta: 0,
				}),
			});
			if (response.ok) {
				alert(`Comanda fechada com sucesso!`);
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao fechar comanda: ${errorResponse.message}`);
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
								<Card.Title title={`Comanda: ${comanda?.id} - Mesa ${comanda?.idMesa}`}>
									<Card.Badge bgColor={comanda?.aberta ? "bg-success" : "bg-danger"} />
								</Card.Title>
								<hr className="m-0" />
								<Card.Body>
									{comanda?.pedidos.map((pedido) => {
										return (
											<>
												<Card.Subtitle title={`Pedido: ${pedido.id} - ${pedido.nomeUsuario}`}>
													<Card.Badge bgColor={pedido.finalizado ? "bg-danger" : "bg-success"} />
													<hr />
												</Card.Subtitle>
												<Table.Root>
													<Table.Thead>
														<Table.Tr>
															<Table.Th title="#" />
															<Table.Th title="Produto" />
															<Table.Th clas={"text-center"} title="Quantidade" />
															<Table.Th clas={"text-center"} title="Subtotal" />
														</Table.Tr>
													</Table.Thead>
													<Table.Tbody>
														{pedido.itens.map((item, index) => {
															return (
																<Table.Tr key={index}>
																	<Table.Td title={index + 1} id={`IndexItem-${item.id}`} />
																	<Table.Td title={item.nome} id={`NomeItem-${item.id}`} />
																	<Table.Td
																		clas="text-center"
																		title={item.quantidade}
																		id={`QuantidadeItem-${item.id}`}
																	/>
																	<Table.Td title={`R$${item.subtotal}`} id={`SubtotalItem-${item.id}`} />
																</Table.Tr>
															);
														})}
													</Table.Tbody>
													<Table.Tfoot>
														<Table.Tr>
															<Table.Td title="Subtotal" />
															<Table.Td />
															<Table.Td />
															<Table.Td title={`R$${pedido.total}`} />
														</Table.Tr>
													</Table.Tfoot>
												</Table.Root>
											</>
										);
									})}
									<Table.Root>
										<Table.Thead>
											<Table.Tr>
												<Table.Th colspan={1} clas={"text-start"} title={`Data entrada: ${comanda?.data}`} />
												<Table.Th colspan={1} title="" />
												<Table.Th colspan={1} title="Total:" />
												<Table.Th colspan={1} title={`R$${comanda?.total}`} />
											</Table.Tr>
										</Table.Thead>
									</Table.Root>
									<Card.Buttons>
										<Card.Button action={FecharComanda} id={comanda?.id} title={"Fechar comanda"} />
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

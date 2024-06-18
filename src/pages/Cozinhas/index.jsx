import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
import { Table } from "../../Components/Table/structure";
export const Cozinhas = () => {
	const [cozinha, useCozinha] = useState([]);
	useEffect(() => {
		fetch(`${route}/cozinhas`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				useCozinha(data);
			})
			.catch((error) => {});
	}, []);
	async function concluir(arg) {
		try {
			const itensId = [];
			const id = parseInt(arg.target.id);
			let pedido = cozinha.find((pedido) => pedido.id === id).itens;

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
				throw new Error("Falha ao atualizar o pedido");
			}

			const responseItens = await fetch(`${route}/cozinhas`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					itens: pedido.map((item) => ({
						id: item.id,
						produzido: 1,
					})),
				}),
			});
			if (!responseItens.ok) {
				throw new Error("Falha ao concluir o pedido");
			}

			alert("Pedido concluído com sucesso!");
			window.location.reload();
		} catch (error) {
			alert(`Erro ao concluir o pedido: ${error.message}`);
		}
	}

	return (
		<>
			{cozinha.length === 0 && (
				<>
					<h1 className="text-center title">Nenhum Pedido</h1> <hr />
				</>
			)}
			<div className="container text-center">
				<div className="row text-center">
					{cozinha.map((pedido, index) => {
						if (index === 0) {
							return (
								<>
									<Card.Root colNumber={12}>
										<Card.Title title={`Pedido: ${pedido.id} - Mesa ${pedido.mesa}`}>
											<Card.Badge bgColor={"bg-danger"} />
										</Card.Title>
										<hr className="m-0" />
										<Card.Body>
											<Table.Root>
												<Table.Thead>
													<Table.Tr>
														<Table.Th title="#" />
														<Table.Th title="Produto" />
														<Table.Th clas={"text-center"} title="Quantidade" />
														<Table.Th clas={"text-center"} title="Produzido?" />
													</Table.Tr>
												</Table.Thead>
												<Table.Tbody>
													{pedido.itens.map((item, index) => {
														return (
															<Table.Tr key={index}>
																<Table.Td title={index + 1} id={`IndexItem-${item.id}`} />
																<Table.Td title={item.nome} id={`NomeItem-${item.id}`} />
																<Table.Td clas="text-center" title={item.quantidade} id={`QuantidadeItem-${item.id}`} />
																<Table.Td clas="text-center">
																	<input
																		type="checkbox"
																		name="categorias"
																		class="form-check m-auto "
																		id={`idCozinha${"Item-" + item.id}`}
																		value={item.cozinha}
																		autoComplete="off"
																	/>
																</Table.Td>
															</Table.Tr>
														);
													})}
												</Table.Tbody>
											</Table.Root>
											<Card.Buttons>
												<Card.Button action={concluir} id={pedido.id} title={"Concluir"} />
											</Card.Buttons>
										</Card.Body>
									</Card.Root>
									<h1 className=" text-center title">Próximos Pedidos</h1>
									<hr />
								</>
							);
						} else {
							return (
								<>
									<Card.Root colNumber={4} hover={true}>
										<Card.Title title={`Pedido: ${pedido.id}`}>
											<Card.Badge bgColor={"bg-danger"} />
										</Card.Title>

										<Card.Body>
											<Card.Details text={pedido.data} />
											{pedido.itens.map((item) => {
												return <Card.Details name={item.nome} text={item.quantidade} />;
											})}
											<Card.Buttons>
												<Card.Button action={concluir} id={pedido.id} title={"Concluir"} />
											</Card.Buttons>
										</Card.Body>
									</Card.Root>
								</>
							);
						}
					})}
				</div>
			</div>
		</>
	);
};

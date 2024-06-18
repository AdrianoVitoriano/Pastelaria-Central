import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { route } from "../../../route";
import { Form } from "../../Components/Form/structure";
import { Table } from "../../Components/Table/structure";
import { Card } from "../../Components/Card/structure";

export const CadastroPedido = () => {
	const { id } = useParams();
	const [categorias, setCategorias] = useState([]);
	const [mesas, setMesas] = useState([]);
	const [resumo, setResumo] = useState([]);
	useEffect(() => {
		fetch(`${route}/tipoitens-itens`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCategorias(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch(`${route}/mesas`, {
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

	useEffect(() => {
		const itens = [];
		categorias.map((categoria) => {
			categoria.itens.map((item) => {
				const quantidade = document.getElementById(`idQuantidadeItem-${item.id}`).value;
				if (quantidade < 0) {
					alert("Quantidade não pode ser negativa");
					document.getElementById(`idQuantidadeItem-${item.id}`).value = "";
				} else if (quantidade > 30) {
					alert("Quantidade máxima permitida é 30");
					document.getElementById(`idQuantidadeItem-${item.id}`).value = 30;
				}
				if (quantidade > 0) {
					itens.push({ ...item, quantidade, subtotal: item.preco * quantidade });
				}
			});
		});
		const resumo = [];
		itens.map((item) => {
			const index = resumo.findIndex((resumoItem) => resumoItem.id === item.id);
			if (index >= 0) {
				resumo[index].itens.push(item);
			} else {
				resumo.push({ ...item, itens: [item] });
			}
		});
		resumo.total = resumo.reduce((acc, item) => acc + item.subtotal, 0);
		setResumo(resumo);
	});

	async function cadastrar() {
		try {

			const mesa = document.getElementById("idMesa");
			if (mesa && mesa.value) {
				const response = await fetch(`${route}/pedidos`, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						idMesa: parseInt(mesa.value),
						idUsuario: "b8e681dc-5713-4d07-9383-cabd7291b797",
						itens: resumo.map(item => ({
							idItem: item.id,
							quantidade: parseInt(item.quantidade),
							cozinha: document.getElementById(`idCozinhaItem-${item.id}`).checked? 1 : 0
						}))
					}),
				});

				if (response.ok) {
					alert("Pedido cadastrado com sucesso!");
				} else {
					const errorResponse = await response.json();
					alert(`Falha ao cadastrar pedido: ${errorResponse.message}`);
				}
			} else {
				alert("Por favor, selecione uma mesa antes de cadastrar o pedido.");
			}
		} catch (error) {
			alert(`Erro ao processar o pedido: ${error.message}`);
		}
	}

	return (
		<>

			<h1 className="text-center title">Cadastro de Pedido</h1>
			<div className="container text-start">
				<Form.Root>
					<Form.Select label="Mesa" defaultText="Mesa">
						{mesas.map((mesa) => {
							return <Form.Options selected={(mesa.id == id)?true:false}value={mesa.id} text={`${mesa.id} - ${mesa.localizacao}`} />;
						})}
					</Form.Select>
					<hr />
				</Form.Root>
			</div>

			<div className="container text-center">
				<div className="row row-cols-1 text-start">
					<div className="col-8">
						<Table.Root>
							<Table.Thead>
								<Table.Tr>
									<Table.Th title="Categoria" />
									<Table.Th title="Produto" />
									<Table.Th clas={"text-center"} title="Preço" />
									<Table.Th clas={"text-center"} title="Quantidade" />
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{categorias.map((categoria) => {
									return categoria.itens.map((item, index) => {
										return (
											<Table.Tr key={index}>
												<Table.Td title={categoria.nome} id={`CategoriaItem-${item.id}`} />
												<Table.Td title={item.nome} id={`NomeItem-${item.id}`} />
												<Table.Td clas="text-center" title={"R$" + item.preco} id={`PrecoItem-${item.id}`} />
												<Table.Td clas="text-center">
													<input
														type={"number"}
														className={`form-control form-control-sm m-0`}
														id={`idQuantidadeItem-${item.id}`}
														placeholder={"0"}
														min="0"
														max="30"
													/>
												</Table.Td>
											</Table.Tr>
										);
									});
								})}
							</Table.Tbody>
						</Table.Root>
					</div>
					<div className="col-4">
						<h5 className="text-center">Resumo do Pedido</h5>
						<hr />
						<Table.Root>
							<Table.Thead>
								<Table.Tr>
									<Table.Th title="Produto" />
									<Table.Th clas="text-center" title="Quantidade" />
									<Table.Th clas="text-center" title="Cozinha" />
									<Table.Th clas="text-center" title="Subtotal" />
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{resumo.map((item, index) => {
									return (
										<>
											<Table.Tr>
												<Table.Td id={`idResumoProduto${"Item-" + item.id}`} title={item.nome} />
												<Table.Td id={`idResumoQuantidade${"Item-" + item.id}`} clas="text-center" title={item.quantidade} />
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
												<Table.Td id={`idResumoSubtotal${"Item-" + item.id}`} clas="text-center" title={"R$" + item.subtotal} />
											</Table.Tr>
										</>
									);
								})}
								{resumo.length === 0 && (
									<>
										<Table.Tr>
											<Table.Td title={"-"} />
											<Table.Td clas="text-center" title={"0"} />
											<Table.Td clas="text-center">
												<input
													type="checkbox"
													name="categorias"
													class="form-check m-auto "
													id={`btn-${"item-" + 0}`}
													autoComplete="off"
												/>
											</Table.Td>
											<Table.Td clas="text-center" title={"R$00,00"} />
										</Table.Tr>
									</>
								)}
							</Table.Tbody>
							<Table.Tfoot>
								<Table.Tr>
									<Table.Td colspan={3} title="Total:" />
									<Table.Td clas="text-center" title={`R$${resumo.total}`} />
								</Table.Tr>
							</Table.Tfoot>
						</Table.Root>
						<Card.Buttons>
							<Card.Button href={"/pedidos"} title="Cancelar" type="danger" />
							<Card.Button
								title="Confirmar Pedido"
								type="success"
								action={cadastrar}
							/>
						</Card.Buttons>
					</div>
				</div>
			</div>
		</>
	);
};

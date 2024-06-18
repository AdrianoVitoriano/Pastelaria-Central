import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { route } from "../../../route";
import { Card } from "../../Components/Card/structure";
import { Form } from "../../Components/Form/structure";

export const AlterarItem = () => {
	const Navigate = useNavigate();
	const [tiposItens, setTipoItens] = useState([]);
	const [item, setItem] = useState([]);
	const { id } = useParams();

		useEffect(() => {
		fetch(`${route}/itens`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setItem(
					data.find((item) => {
						return item.id == id;
					})
				);
			})
			.catch((error) => {});
	}, []);

	useEffect(() => {
		fetch(`${route}/tipoitens-ativos`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setTipoItens(data);
			})
			.catch((error) => {});
	}, []);

	async function cadastrar() {
		try {
			const nome = document.getElementById("idNome");
			const categoria = document.getElementById("idCategoria");
			const preco = document.getElementById("idPreço");
			if (nome.value && categoria.value && preco.value) {
				const response = await fetch(`${route}/itens/${id}`, {
					method: "PUT",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						nome: nome.value,
						idTipo: parseInt(categoria.value),
						preco: preco.value,
					}),
				});

				if (response.ok) {
					alert("Item alterado com sucesso!");
					return Navigate("/itens");
				} else {
					const errorResponse = await response.json();
					alert(`Erro ao alterar o item: ${errorResponse.message}`);
				}
			} else {
				alert(`Erro ao alterar o item: Preencha todos os campos!`);
			}
		} catch (error) {
			alert(`Erro ao alterar o item: ${error.message}`);
		}
	}
	return (
		<>
			<div className="container text-center">
				<div className="row row-cols-1 text-center">
					<Card.Root>
						<Card.Title title={`Alterar Item`} />
						<Card.Body>
							<Form.Root>
								<Form.Label label="Nome"  type="text" placeholder={item.nome} />
								<Form.Select label="Categoria" defaultText="Categoria">
									{tiposItens.map((tipo) => {
										return <Form.Options selected={item?.idTipo == tipo.id} value={tipo.id} text={tipo.nome} />;
									})}
								</Form.Select>
								<Form.Label label="Preço" type="Number"  placeholder={`R$${item.preco}`} />
							</Form.Root>
							<Card.Buttons>
								<Card.Button action={cadastrar} title="Salvar" />
								<Card.Button href={"/itens"} title="Cancelar" />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
				</div>
			</div>
		</>
	);
};

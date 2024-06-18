import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../route";
import { Card } from "../../Components/Card/structure";
import { Form } from "../../Components/Form/structure";

export const CadastroItem = () => {
	const navigate = useNavigate();
	const [tiposItens, setTipoItens] = useState([]);
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
			if(nome.value && categoria.value && preco.value){
			const response = await fetch(`${route}/itens`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					nome: nome.value,
					idTipo: categoria.value,
					preco: preco.value,
				}),
			});
		
			if (response.ok) {
				alert("Item cadastrado com sucesso!");
				return navigate("/itens")
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao cadastrar item: ${errorResponse.message}`);
			}
		}else{
			alert(`Erro ao cadastrar item: Preencha todos os campos!`);
		}
		} catch (error) {
			alert(`Erro ao cadastrar item: ${error.message}`);
		}
	}

	return (
		<>
			<div className="container text-center">
				<div className="row row-cols-1 text-center">
					<Card.Root>
						<Card.Title title={`Cadastro de Item`} />
						<Card.Body>
							<Form.Root>
								<Form.Label label="Nome" type="text" placeholder="Pastel de..." />
								<Form.Select label="Categoria" defaultText="Categoria">
									{tiposItens.map((tipo) => {
										return <Form.Options value={tipo.id} text={tipo.nome} />;
									})}
								</Form.Select>
								<Form.Label label="Preço" type="Number" placeholder="R$" />
							</Form.Root>
							<Card.Buttons>
								<Card.Button action={cadastrar} title="Salvar" />
								<Card.Button  href={"/itens"} title="Cancelar" />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
				</div>
			</div>
		</>
	);
};

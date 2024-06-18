import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../route";
import { Card } from "../../Components/Card/structure";
import { Form } from "../../Components/Form/structure";

export const CadastroCategorias = () => {
	const navigate = useNavigate();
	const [tiposItens, setTipoItens] = useState([]);
	useEffect(() => {
		fetch(`${route}/tipoitens`, {
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
		if (!tiposItens.find((categoria)=>categoria.nome === nome.value)) {
			const response = await fetch(`${route}/tipoitens`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					nome: nome.value,
				}),
			});
			if (response.ok) {
				alert("Categoria cadastrado com sucesso!");
				return navigate("/categorias")
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao cadastrar a categoria: ${errorResponse.message}`);
			}
		}else{
			alert(`Erro ao cadastrar a categoria: Categoria já cadastrada!`);
		}
	 } catch (error) {
			alert(`Erro ao cadastrar a categoria: ${error.message}`);
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
								<Form.Label label="Nome" type="text" placeholder="Categoria..." />
							</Form.Root>
							<Card.Buttons>
								<Card.Button action={cadastrar} title="Salvar" />
								<Card.Button  href={"/categorias"} title="Cancelar" />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
				</div>
			</div>
		</>
	);
};

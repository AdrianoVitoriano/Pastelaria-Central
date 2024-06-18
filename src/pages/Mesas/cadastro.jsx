import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../../../route";
import { Card } from "../../Components/Card/structure";
import { Form } from "../../Components/Form/structure";

export const CadastroMesa = () => {
	const navigate = useNavigate();
	const [mesas, setMesas] = useState([]);
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
			.catch((error) => {console.log(error)});
	}, []);

	async function cadastrar() {
		try {
			const localizacao = document.getElementById("idLocalização");

			if(localizacao.value){
			const response = await fetch(`${route}/mesas`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					localizacao: localizacao.value,
				}),
			});
		
			if (response.ok) {
				alert("Mesa cadastrada com sucesso!");
				return navigate("/mesas")
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao cadastrar mesa: ${errorResponse.message}`);
			}
		}else{
			alert(`Erro ao cadastrar mesa: Preencha todos os campos!`);
		}
		} catch (error) {
			alert(`Erro ao cadastrar mesa: ${error.message}`);
		}
	}

	return (
		<>
			<div className="container text-center">
				<div className="row row-cols-1 text-center">
					<Card.Root>
						<Card.Title title={`Cadastro de Mesa`} />
						<Card.Body>
							<Form.Root>
								<Form.Label label="Localização" type="text" placeholder="Ao lado da..." />
							</Form.Root>
							<Card.Buttons>
								<Card.Button action={cadastrar} title="Salvar" />
								<Card.Button  href={"/mesas"} title="Cancelar" />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
				</div>
			</div>
		</>
	);
};

import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
import { useNavigate } from "react-router-dom";
export const Categorias = () => {
	const navigate = useNavigate();
	const [tipoItens, setTipoItens] = useState([]);
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
	async function DesAtivar(arg) {
		try {
			const id = arg.target.id;
			const ativo = arg.target.firstChild.data === "Desativar categoria" ? false : true;
			const response = await fetch(`${route}/tipoitens/${id}`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ativo: ativo,
				}),
			});
			if (response.ok) {
				alert(`Categoria ${ativo ? "reativada" : "desativada"} com sucesso!`);
				window.location.reload()
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao ${ativo ? "reativar" : "desativar"}: ${errorResponse.message}`);
			}
		} catch (error) {
			alert(`Erro ao ${ativo ? "reativar" : "desativar"} a categoria: ${error.message}`);
		}
	}
	return (
		<>
			{tipoItens.length === 0 && (
				<>
					<h1 className="text-center title">Nenhuma Categoria Cadastrada</h1> <hr />
				</>
			)}
			<div className="container text-center">
				<div className="row text-center">
					<Card.Root key={0} colNumber={4} hover={true}>
						<Card.Title title={`Opções`}></Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button href={"/categorias/cadastro"} title={"Nova categoria"} />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{tipoItens.map((categoria, index) => {
						return (
							<Card.Root key={index} colNumber={4} hover={true}>
								<Card.Title title={`${categoria.nome}`}>
									<Card.Badge bgColor={categoria.ativo ? "bg-success" : "bg-danger"} />
								</Card.Title>
								<Card.Body>
									<Card.Buttons>
										<Card.Button
											action={DesAtivar}
											id={categoria.id}
											title={`${categoria.ativo ? "Desativar" : "Reativar"} categoria`}
										/>
									</Card.Buttons>
								</Card.Body>
							</Card.Root>
						);
					})}
				</div>
			</div>
		</>
	);
};

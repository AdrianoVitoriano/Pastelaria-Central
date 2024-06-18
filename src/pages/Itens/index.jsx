import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
export const Itens = () => {
	const [itens, setItens] = useState([]);
	useEffect(() => {
		fetch(`${route}/itens`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setItens(data);
			})
			.catch((error) => {});
	}, []);
	async function DesAtivar(arg) {
		try {
			const id = arg.target.id;
			const ativo = arg.target.firstChild.data === "Desativar item" ? false : true;
			const response = await fetch(`${route}/itens/${id}`, {
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
				window.location.reload();
			} else {
				const errorResponse = await response.json();
				alert(`Erro ao ${ativo ? "reativar" : "desativar"}: ${errorResponse.message}`);
			}
		} catch (error) {
			alert(`Erro ao ${ativo ? "reativar" : "desativar"} o item: ${error.message}`);
		}
	}
	return (
		<>
			{itens.length === 0 && (
				<>
					<h1 className="text-center title">Nenhum Item Cadastrado</h1> <hr />
				</>
			)}
			<div className="container text-center">
				<div className="row text-center">
					<Card.Root colNumber={4} hover={true}>
						<Card.Title title={`Opções`}></Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button href={"/itens/cadastro"} title={"Novo item"} />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{itens.map((item) => {
						return (
							<Card.Root colNumber={4} hover={true}>
								<Card.Title title={`${item.nome}`}>
									<Card.Badge bgColor={item.ativo ? "bg-success" : "bg-danger"} />
								</Card.Title>

								<Card.Body>
									<Card.Details name={"Preço"} text={`R$${item.preco}`} />
									<Card.Buttons>
										<Card.Button href={`/itens/alterar/${item.id}`} title={"Alterar item"} />
										<Card.Button
											action={DesAtivar}
											id={item.id}
											title={`${item.ativo ? "Desativar" : "Reativar"} item`}
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

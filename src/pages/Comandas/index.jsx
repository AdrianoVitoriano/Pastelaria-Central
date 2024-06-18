import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";

export const Comandas = () => {
	const [comandas, setComandas] = useState([]);
	useEffect(() => {
		fetch(`${route}/comandas-abertas`, {
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
				window.location.reload();
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
			{comandas.length === 0 && (
				<>
					<h1 className="text-center title">Nenhuma Comanda</h1> <hr />
				</>
			)}
			<div className="container text-center">
				<div className="row text-center">
					{comandas.map((comanda) => {
						return (
							<>
								<Card.Root colNumber={4} hover={true}>
									<Card.Title title={`Comanda: ${comanda.id}`}>
										<Card.Badge bgColor={comanda.aberta ? "bg-success" : "bg-danger"} />
									</Card.Title>

									<Card.Body>
										<Card.Details text={comanda.data} />
										<Card.Details name={"Mesa"} text={comanda.idMesa} />
										<Card.Details name={"Total"} text={`R$${comanda.total ? comanda.total : "00,00"}`} />
										<Card.Buttons>
											<Card.Button action={FecharComanda}  id={comanda?.id} title={"Fechar"} />
											<Card.Button href={`/comandas/${comanda.id}`} title={"Visualizar"} />
										</Card.Buttons>
									</Card.Body>
								</Card.Root>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};

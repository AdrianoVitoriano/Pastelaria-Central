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
	return (
		<>
			<div class="container text-center">
				<div className="row text-center">
				<Card.Root>
						<Card.Title title={`Opções`}>
						</Card.Title>

						<Card.Body>
							<Card.Buttons>
								<Card.Button action={() => {}} title={"Novo item"} />
							</Card.Buttons>
						</Card.Body>
					</Card.Root>
					{itens.map((item) => {
						return (
							<Card.Root>
								<Card.Title title={`${item.nome}`}>
									<Card.Badge bgColor={item.ativo ? "bg-success" : "bg-danger"} />
								</Card.Title>

								<Card.Body>
									<Card.Details name={"Preço"} text={`R$${item.preco}`} />
									<Card.Buttons>
										<Card.Button action={() => {}} title={"Alterar item"} />
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

import { useEffect, useState } from "react";
import { Card } from "../../Components/Card/structure";
import { route } from "../../../route";
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
	console.log(cozinha);
	return (
		<>
			<div class="container text-center">
				<div className="row text-center">
					{cozinha.map((pedido) => {
						return (
							<>
								<Card.Root>
									<Card.Title title={`Pedido: ${pedido.id}`}>
										<Card.Badge bgColor={"bg-danger"} />
									</Card.Title>

									<Card.Body>
										<Card.Details text={pedido.data} />
										{pedido.itens.map((item)=>{
											return(<Card.Details name={item.nome} text={item.quantidade} />)
										})}
										<Card.Buttons>
											<Card.Button action={() => {}} title={"Concluir"} />
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

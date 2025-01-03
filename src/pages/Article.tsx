import { useLoaderData, useParams } from "react-router-dom"; // Ajout de useParams
import "./Article.css";

type Data = {
	title: string;
	content: string;
};

function Article() {
	const data = useLoaderData() as Data; // Récupération des données via le loader
	const { id } = useParams(); // Récupération du paramètre dynamique 'id'

	return (
		<article className={`article article-${id}`}>
			<h1>{data.title}</h1>
			<p>{data.content}</p>
		</article>
	);
}

export default Article;

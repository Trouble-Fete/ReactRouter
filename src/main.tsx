import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Article from "./pages/Article"; // Correction ici : on importe le bon composant Article

// Données des articles
const allData = [
	{
		id: 1,
		title: "Lorem Ipsum",
		content: "Lorem ipsum dolor sit amet",
	},
	{
		id: 2,
		title: "Schnapsum",
		content: "Lorem Elsass ipsum Salut bisamme",
	},
	{
		id: 3,
		title: "Cupcake Ipsum",
		content: "Tiramisu pastry wafer brownie soufflé",
	},
];

type Data = (typeof allData)[0];

const getSomeData = (id: number) => {
	return allData.find((article) => article.id === id) as Data | null;
};

// 🗺️ Configuration du routeur
const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/articles/:id",
				element: <Article />,
				loader: ({ params }) => {
					const idAsInt = Number.parseInt(params.id ?? "0");
					const data = getSomeData(idAsInt);

					if (!data) {
						throw new Response("Not Found", { status: 404 });
					}

					return data;
				},
			},
		],
	},
]);

// 🚀 Rendu de l'application
const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

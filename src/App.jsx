import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


function App() {
	const router = createBrowserRouter([
		{
			path: "/", element: <Layout />,
			children: [
				{ path: "/", element: <Dashboard /> },
				// { path: "/login", element: <Login /> },
				// { path: "/signup", element: <Signup /> },
				// {
				// 	element: <PrivateRoute />,
				// 	children: [
				// 		{ path: "/dashboard", element: <Dashboard /> }
				// 	]
				// },
			]
		}
	])

	return <RouterProvider router={router} />
}

export default App

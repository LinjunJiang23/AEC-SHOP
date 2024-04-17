import * as React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState, useTransition } from 'react';
import Main from '../../src/Main';
import ShopppingCartDetail from '../../src/Component/ShoppingCartDetail';
 
export default function Router() {
	return (
		<Suspense fallback ={<Loading />}>
			<Switch>
				<Route />
		</Suspense>
	);
}

function Route() {
	const [page, setPage] = useState('/');
	const [isPending, startTransition] = useTransition();
	
	function nav(url) {
		startTransition(() => {
		  setPage(url);
		});
	}
	let content;
	if (page === '/') {
		content = (
			<Main navi={nav} />
		);
	}
	else if (page === '/shoppingcartdetail') {
		content = (
			<SCDetail />
		);
	}
	
	return (
		<Layout isPending={isPending}>
			{content}
		</Layout>
	);
}

function Loading() {
	return <h2> Loading...! </h2>;
}


import { useEffect, useState } from 'react'
import { Switch } from 'react-router-dom';

const Root = () => {
	const [routers, setRouters] = useState([])
	const routerFiles = require.context('./', false, /\.js$/) // 扫描路由文件
	useEffect(() => {
		let routes = []
		routerFiles.keys().forEach((key) => {
			routes = routes.concat(routerFiles(key).default)
			console.log(routes);
		})
		setRouters(routes)
	}, [])
	return (
		<div className='container'>
			<Switch>
				{routers}
			</Switch>
		</div>
	)
}
export default Root
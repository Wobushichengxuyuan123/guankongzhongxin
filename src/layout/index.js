import { useEffect, useState } from 'react';
import { Layout, } from 'antd';
import MenuTop from '../js/components/menu/menuTop'
import Menus from '../js/components/menu/menu';
import muneJson from './muneJson'
import './index.scss'
const { Content, Sider } = Layout;
const BaseLayout = (props) => {
	const [defaultKey, setDefaultKey] = useState([])
	const [openFlag, setOpenFlag] = useState(true); // 菜单状态
	const menuChange = (data) => {
		setDefaultKey(data)
	}
	useEffect(() => {
		setDefaultMune()
	}, [])
	const setDefaultMune = () => {
		const { pathname } = window.location
		const pathParams = pathname.split('$')
		if (pathParams.length > 1) {
			const baseUrl = pathParams
			const activeMenu = muneJson.find((e) => e.url === baseUrl.replace('/', ''))
			setDefaultKey(activeMenu.children)
		} else {
			setDefaultKey(muneJson[0].children)
		}
	}
	return (
		<Layout>
			<MenuTop
				change={menuChange}
				data={muneJson}
			// userName={userName}
			/>
			<Layout>
				<Sider width={60} style={{ background: '#fff', zIndex: '9', display: openFlag ? 'block' : 'none' }}>
					<Menus menu={defaultKey} />
				</Sider>
				{/* 控制菜单显示 */}
				<div className={openFlag ? 'closeBtn' : 'openBtn'} onClick={_ => setOpenFlag(!openFlag)}></div>
				<Layout>
					<Content
						style={{
							padding: 0,
							margin: 0,
							minHeight: 280,
						}}
					>
						{props.children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}

export default BaseLayout
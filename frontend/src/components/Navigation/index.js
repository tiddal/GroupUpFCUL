import React, { useState } from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function Navigation({ items }) {
	const [sidebarState, setSidebarState] = useState(false);

	function toggleSidebar() {
		setSidebarState(!sidebarState);
	}

	return (
		<>
			<Navbar toggleSidebar={toggleSidebar} />
			<Sidebar
				items={items}
				state={sidebarState}
				toggleSidebar={toggleSidebar}
			/>
		</>
	);
}

export default Navigation;

import React, { useState } from 'react';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Profilebar from '../Profilebar';

function Navigation({ items }) {
	const [sidebarState, setSidebarState] = useState(false);
	const [profilebarState, setProfilebarState] = useState(false);

	function toggleSidebar() {
		setSidebarState(!sidebarState);
		setProfilebarState(false);
	}
	function toggleProfilebar() {
		setProfilebarState(!profilebarState);
		setSidebarState(false);
	}

	return (
		<>
			<Navbar
				toggleSidebar={toggleSidebar}
				toggleProfilebar={toggleProfilebar}
			/>
			<Sidebar
				items={items}
				sidebarState={sidebarState}
				profilebarState={profilebarState}
				toggleSidebar={toggleSidebar}
			/>
			<Profilebar
				sidebarState={sidebarState}
				profilebarState={profilebarState}
				toggleProfilebar={toggleProfilebar}
			/>
		</>
	);
}

export default React.memo(Navigation);

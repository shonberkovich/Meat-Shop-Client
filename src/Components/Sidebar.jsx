import React from 'react';
import './SideBar.css'; // נשתמש בקובץ CSS מותאם אישית

function Sidebar({onTypeSelect}) {

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <div> תפריט</div>
                <li><span onClick={() => onTypeSelect("all")}>כל המוצרים</span></li>
                <li><span onClick={() => onTypeSelect("chicken")}>מוצרי עוף</span></li>
                <li><span onClick={() => onTypeSelect("beef")}>מוצרי בקר</span></li>
            </ul>

        </div>

    );

}

export default Sidebar;

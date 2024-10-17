
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { HiOutlineChartPie } from "react-icons/hi2";
import { BsAlarm } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { SiPolywork } from "react-icons/si";
import { IoAccessibilityOutline } from "react-icons/io5";
import { toggleSidebar, toggleExpand, setActiveItem } from "../actions/sidebarActions";
import "./index.css"; 

const SideBarComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, isExpanded, activeItem } = useSelector((state) => state.sidebar);
  const location = useLocation();

  useEffect(() => {
    dispatch(setActiveItem(location.pathname));
  }, [location.pathname, dispatch]);

  // Toggle sidebar on hamburger click
  const handleBarBtn = () => {
    dispatch(toggleSidebar());
    dispatch(toggleExpand());
  };

  // Sidebar menu items
  const menuItems = [
    { path: "/dashboard", icon: <HiOutlineChartPie />, label: "Dashboard" },
    { path: "/home", icon: <BsAlarm />, label: "Event Manager" },
    { path: "/roles", icon: <SiPolywork />, label: "Roles" },
    { path: "/permissions", icon: <IoAccessibilityOutline />, label: "Permissions" },
    { path: "/users", icon: <LuUser />, label: "User" },
  ];

  return (
    <>
      {/* Sidebar Toggle Button (Hamburger) */}
      <i className="bi bi-list-ul nav-sidebar-icon" onClick={handleBarBtn}></i>

      {/* Sidebar */}
      <div
        className={`d-flex flex-column bg-primary position-fixed top-10 start-0 ${
          isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        } ${isOpen ? "open" : ""}`}
        style={{ zIndex: "1040" }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header d-flex align-items-center p-3">
          <FaReact className="react-icon me-2" />
          {isExpanded && <h5 className="mb-0 text-white">CREATIVE TIM</h5>}
        </div>

        {/* Sidebar Menu Items */}
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`nav-link text-white d-flex align-items-center ${
                activeItem === item.path ? "active" : ""
              }`}
              onClick={() => dispatch(setActiveItem(item.path))}
              style={{ padding: "12px 20px" }}
            >
              <span className="me-2">{item.icon}</span>
              {isExpanded && <span>{item.label}</span>}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBarComponent;

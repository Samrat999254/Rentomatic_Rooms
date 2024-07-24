import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{}} className="bg-gray-50 w-64 text-center" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
              style={{display:"inline-block",fontSize:"20px",color:"#183639",}}
                
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white fz-20"
              >
                <span  className="text-center">Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to={`rooms`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Rooms</span>
              </Link>
            </li>
            <li>
              <Link
                to={`tenant`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Tenant</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

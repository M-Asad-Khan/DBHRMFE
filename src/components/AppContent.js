import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import ProtectedRoute from "../layout/ProtectedRoute";
// const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
// const Login = React.lazy(() => import("../views/pages/login/Login.js"));
// const Employee = React.lazy(() => import("../views/Employees/Index"));
const Clients = React.lazy(() => import("../views/Clients/Index"));
// const Teams = React.lazy(() => import("../views/Teams/index"));
// const jobPosting = React.lazy(() => import("../views/JobPosting/Index"));
const UserManagment = React.lazy(() => import("../views/UserManagment/index"));
// const interviewFeedback = React.lazy(() =>
//   import("../views/interviewFeedback/Index")
// );
// const Candidates = React.lazy(() => import("./views/Candidates/Index"));
// routes config
import { HRRoutes, adminRoutes } from "../routes";

import { useSelector } from "react-redux";
let routes = [];
const AppContent = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  let currentUserPermissions = [];
  console.log("currentUser", currentUser);
  if (currentUser && currentUser !== null) {
    currentUserPermissions = currentUser.userPermission.map((x) => {
      return x.role.name;
    });
    console.log("permissions", currentUserPermissions);
  }
  //checks to set routes based on permission

	currentUserPermissions &&
		currentUserPermissions?.map((x) => {
			if (x == "Admin") {
				routes = adminRoutes;
			} else if (x === "HR") {
				let routesOfHR = [];
				let tempRoutes = [];
				routesOfHR = adminRoutes.filter((route) => {
					return route.name !== "User Managment";
				});
				if (routes.length == 0) {
					routes = [...routesOfHR];
				} else if (routes.length > 0) {
					tempRoutes = routesOfHR.filter(
						({ name: id1 }) => !routes.some(({ name: id2 }) => id2 === id1)
					);
					console.log("temproutes", tempRoutes);
					routes = [...routes, ...tempRoutes];
					console.log("routes 1233", routes);
				}
			} else if (x == "Client") {
				let routesOfClient = [];
				let tempRoutes = [];
				routesOfClient = adminRoutes.filter((route) => {
					if (
						route.name !== "User Managment" &&
						route.name !== "Candidates" &&
						route.name != "Interview Feedback" &&
						route.name != "Job Posting" &&
						route.name != "Teams" &&
						route.name != "Employee"
					)
						return true;
				});

				if (routes.length == 0) {
					routes = [...routesOfClient];
				} else if (routes.length > 0) {
					tempRoutes = routesOfClient.filter(
						({ name: id1 }) => !routes.some(({ name: id2 }) => id2 === id1)
					);
					console.log("tempRoutes", tempRoutes);
					routes = [...routes, ...tempRoutes];
					console.log("routes 1233", routes);
				}
			} else if (x == "Employee") {
				let routesOfEmployee = [];
				let tempRoutes = [];
				routesOfEmployee = 
          adminRoutes.filter((route) => {
					if (
						route.name !== "User Managment" &&
						route.name !== "Candidates" &&
						route.name != "Clients"
					)
						return true;
				});

        if (routes.length == 0) {
          routes = [...routesOfEmployee];
        } else if (routes.length > 0) {
          tempRoutes = routesOfEmployee.filter(
            ({ name: id1 }) => !routes.some(({ name: id2 }) => id2 === id1)
          );
          console.log("tempRoutes", tempRoutes);
          routes = [...routes, ...tempRoutes];
          console.log("routes 1233", routes);
        }
      }
    });

  console.log("routes", routes);
  return (
    // <CContainer lg>
    <div className="pl-4 pr-4">
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          <ProtectedRoute isAllowed={currentUser && currentUser !== null}>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <>
                        <route.component {...props} />
                      </>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </ProtectedRoute>
        </Switch>
      </Suspense>
    </div>
    // </CContainer>
  );
};
export default React.memo(AppContent);

import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {  CSpinner } from "@coreui/react";
import ProtectedRoute from "../layout/ProtectedRoute";
import { adminRoutes } from "../routes";
import { useSelector } from "react-redux";
const AppContent = () => {
  let routes = [];
  const currentUser = useSelector((state) => state.login.currentUser);
  let currentUserPermissions = [];
  if (currentUser && currentUser !== null) {
    currentUserPermissions = currentUser.userPermission.map((x) => {
      return x.role.name;
    });
  }
  //checks to set routes based on permission
  const ActiveRoutes = (x)=>{
    const tempRoutes = x.filter(
        ({ name: id1 }) => !routes.some(({ name: id2 }) => id2 === id1));
    routes = [...routes, ...tempRoutes];
  }
  currentUserPermissions &&
        currentUserPermissions?.map((x) => {
            if (x == "Admin") {
                routes = adminRoutes;
            } else if (x === "HR") {
                let routesOfHR = [];
                routesOfHR = adminRoutes.filter((route) => {
                    return route.name !== "User Managment";
                });
                routes.length <= 0 ? routes = [...routesOfHR] : ActiveRoutes(routesOfHR);
            } else if (x == "Client") {
                let routesOfClient = [];
                routesOfClient = adminRoutes.filter((route) => {
                    if (
                        route.name !== "User Managment" &&
                        route.name !== "Candidates" &&
                        route.name != "Interview Feedback" &&
                        route.name != "Job Posting" &&
                        route.name != "Employee"
                    )
                        return true;
                });
                routes.length <= 0 ? routes = [...routesOfClient] : ActiveRoutes(routesOfClient);
            } else if (x == "Employee") {
                let routesOfEmployee = [];
                routesOfEmployee =
                 adminRoutes.filter((route) => {
                    if (
                        route.name !== "User Managment"
                    )
                        return true;
                });
                routes.length <= 0 ? routes = [...routesOfEmployee] : ActiveRoutes(routesOfEmployee);
            }
         });
    return (
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
    );
 };
export default React.memo(AppContent);
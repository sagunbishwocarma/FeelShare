// import React, { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { UserContext } from "../../context/userContext";
// import { ProfessionalContext } from "../../context/professionalContext";

// const PublicRoute = () => {
//   const { user } = useContext(UserContext);
//   const {professional} = useContext(ProfessionalContext);

  
//   if (user) {
//     return <Navigate to="/seekerDashboard" />;
//   }
//   if (professional) {
//     return <Navigate to="/professionalDashboard" />;
//   }

  
//   return <Outlet />;
// };

// export default PublicRoute;
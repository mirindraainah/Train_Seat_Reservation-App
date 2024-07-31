import React from "react";
import CardAdminDestination from "../../components/defautlLayout/cardAdminDestination";

const AdminDestination = () => {
  return (
    <div className="AdminDestination">
      
      <div className="reservation">
        <CardAdminDestination />
        <CardAdminDestination />
        <CardAdminDestination />
        <CardAdminDestination />
        <CardAdminDestination />
      </div>
    </div>
  );
};

export default AdminDestination;

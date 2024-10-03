import LeaveHeader from "./LeaveHeader"
import { useEffect, useState, useContext } from "react";
import { Context } from "../../main";
import axios from "axios";
// import { Link } from "react-router-dom";
import AccessControl from "./AccessControl";
import RenderTable from "./RenderTable";

const SupervisorLeaveRenderPage = () => {
    const { user } = useContext(Context);
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [approvedLeaves, setApprovedLeaves] = useState([]);
    const [rejectedLeaves, setRejectedLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLeaves = async () => {
        try {
            const pendingResponse = await axios.get(
                `http://localhost:8800/api-v1/leave/all-leave-need-supervisor-approval`,
                { withCredentials: true }
            );
            const approvedResponse = await axios.get(
                `http://localhost:8800/api-v1/leave/all-leave-supervisor-approved`,
                { withCredentials: true }
            );
            const rejectedResponse = await axios.get(
                `http://localhost:8800/api-v1/leave/all-leave-supervisor-rejected`,
                { withCredentials: true }
            );
            setPendingLeaves(pendingResponse.data.data);
            setApprovedLeaves(approvedResponse.data.data);
            setRejectedLeaves(rejectedResponse.data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLeaves();
        }
    }, [user]);

    const approveStyle = (approve) => {
        if (approve === "Pending") {
            return "text-orange-500";
        } else if (approve === "Approved") {
            return "text-green-500";
        } else {
            return "text-red-500";
        }
    };

    const showSupervisorAppliedLeaveStyle = (leave) => {

        if (leave.userId === user) {
            return "bg-green-400 text-white";
        }
        else {
            return "";
        }
    }

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error)
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <>
            {/* Leave Header */}
            <LeaveHeader fullName={`${user.firstName} ${user.lastName}`} />

            <AccessControl userType={user.userType} />

            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Leave Requests</h1>
                <RenderTable leaves={pendingLeaves} title={"Pending Supervisor Approval"} showSupervisorAppliedLeaveStyle={showSupervisorAppliedLeaveStyle} approveStyle={approveStyle} />
                <RenderTable leaves={approvedLeaves} title={"Approved by Supervisor"} showSupervisorAppliedLeaveStyle={showSupervisorAppliedLeaveStyle} approveStyle={approveStyle} />
                <RenderTable leaves={rejectedLeaves} title={"Rejected by Supervisor"} showSupervisorAppliedLeaveStyle={showSupervisorAppliedLeaveStyle} approveStyle={approveStyle} />
            </div>



        </>
    )
}

export default SupervisorLeaveRenderPage
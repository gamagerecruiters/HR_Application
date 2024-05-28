import { Link } from "react-router-dom"

const AccessControl = ({ userType }) => {
    if (userType === "User") {
        return (
            <>
                <Link to={"/apply-leave"}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                        Apply Leave
                    </button>
                </Link>
            </>
        )
    }
    else if (userType === "Admin") {
        return (
            <>
                <Link to={"/apply-leave"}>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
                        Apply Leave
                    </button>
                </Link>
                <Link to={"/leave-request-check-supervisor"}>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                        Check Requested Leave By Users
                    </button>
                </Link>
            </>
        )
    }
    else {
        return(
        <>
            <Link to={"/leave-request-check-admin"}>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
                    Check Leave
                </button>
            </Link>

            <Link to={"/leave-statistics"}>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                    Leave Statistics
                </button>
            </Link>
        </>
        )
    }

}

export default AccessControl
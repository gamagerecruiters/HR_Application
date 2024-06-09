import { useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Context } from '../../main';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ApplyLeave = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [type, setType] = useState('Sick Leave');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const leaveData = {
        userId: user._id,
        startDate,
        endDate,
        reason,
        type,
        supervisorApproval : user.userType === "Admin" ? "Approved" : "Pending",
      };

      await axios.post('http://localhost:8800/api-v1/leave/add-leave', leaveData, { withCredentials: true });
      toast.success('Leave application submitted successfully');
      setStartDate(null);
      setEndDate(null);
      setReason('');
      setType('Sick Leave');
      navigate('/leave')
    } catch (error) {
      toast.error('Failed to submit leave application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Apply for Leave</h2>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Leave Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;


const LeaveDeletePrompt = ({showDeletePrompt , handleDeleteCancel , handleDeleteConfirm}) => {
  return (
    <>
    {/* Delete Prompt */}
    {showDeletePrompt && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white rounded-lg p-4 z-20">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this leave?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                onClick={handleDeleteConfirm}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDeleteCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LeaveDeletePrompt
const ImageUpload = ({ label, onChange, preview, onRemove }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-black">{label}</label>

            {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500">Click to upload</p>
                    </div>
                    <input type="file" className="hidden" onChange={onChange} accept="image/*" />
                </label>
            ) : (
                <div className="relative w-24 h-24">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
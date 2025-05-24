export default function LoadingOverlay({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center animate-scale-in">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">AI Analysis in Progress</h3>
        <p className="text-slate-300 mb-4">Our AI is carefully analyzing the resume against the job requirements...</p>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
          </div>
          <span>Processing</span>
        </div>
      </div>
    </div>
  );
}

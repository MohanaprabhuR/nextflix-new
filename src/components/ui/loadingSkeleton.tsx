export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.86)] backdrop-blur-[100px]">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-6">
          <img
            src="/image.png"
            alt="Arkansas Department of Finance and Administration"
            className="w-20 h-20 flex-shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Arkansas Rural Health Transformation Program (RHTP)
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Management & Insights Portal
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Arkansas Department of Finance and Administration (DFA)
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// A simple component to test if Tailwind CSS is working correctly
export default function TailwindTest() {
  return (
    <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Tailwind CSS is working!</h2>
      <p className="text-blue-200">This component is styled using Tailwind CSS classes.</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-blue-700 p-2 rounded">Grid Item 1</div>
        <div className="bg-blue-800 p-2 rounded">Grid Item 2</div>
        <div className="bg-blue-900 p-2 rounded">Grid Item 3</div>
      </div>
      <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
        Test Button
      </button>
    </div>
  );
}

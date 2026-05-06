import React from "react";

const HelloWorld: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0a0a0b] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Hello World</h1>
        <p className="text-gray-500">Seu boilerplate FiveM está pronto para uso.</p>
      </div>
    </div>
  );
};

export default HelloWorld;

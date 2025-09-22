"use client";

import Link from "next/link";

export default function Page() {
  const tools = [
    {
      title: "문법 검사기",
      description: "문법, 맞춤법, 스타일 오류를 실시간으로 검사하고 수정하세요",
      href: "/grammar-check",
      icon: "📝",
    },
    {
      title: "메인",
      description: "메인 페이지",
      href: "/main",
      icon: "🏠",
    },
    {
      title: "로그인",
      description: "로그인 페이지",
      href: "/login",
      icon: "🔒",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Samples</h1>
        </div>

        <div className="space-y-3">
          {tools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {tool.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

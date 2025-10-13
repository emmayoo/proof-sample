import { Search, User, ArrowRight, Plus, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back Manager</h1>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Stats Card */}
        <div className="rounded-xl bg-gradient-to-r from-pink-200 to-orange-200 p-6 shadow-lg">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-800">선생님 13명</p>
            <p className="text-lg font-semibold text-gray-800">클래스 10반</p>
            <p className="text-lg font-semibold text-gray-800">학생 200명</p>
          </div>
        </div>

        {/* Right Stats Card */}
        <div className="rounded-xl bg-purple-800 p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-white">Puroo가 보내는 메시지</h3>
          <div className="h-32 rounded bg-purple-900 p-4">
            <p className="text-gray-300">메시지 내용이 여기에 표시됩니다...</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Status Overview Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-200 p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">선생님 현황</h3>
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <a href="#" className="text-sm text-blue-600">
                View All
              </a>
            </div>
            <div className="rounded-xl bg-gray-200 p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">클래스 현황</h3>
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <a href="#" className="text-sm text-blue-600">
                View All
              </a>
            </div>
            <div className="rounded-xl bg-gray-200 p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">구독 현황</h3>
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <a href="#" className="text-sm text-blue-600">
                View All
              </a>
            </div>
            <div className="rounded-xl bg-gray-200 p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">학생 현황</h3>
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <a href="#" className="text-sm text-blue-600">
                View All
              </a>
            </div>
          </div>

          {/* Ongoing Tasks */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">진행중인 과제</h3>
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left text-sm font-medium text-gray-600">
                      담당 선생님
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-600">
                      클래스 이름
                    </th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-600">완료/등록</th>
                    <th className="pb-2 text-left text-sm font-medium text-gray-600">진행률</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr>
                    <td className="py-2 text-sm text-gray-800">Teachers Name</td>
                    <td className="py-2 text-sm text-gray-800">대치초 3학년 3반</td>
                    <td className="py-2 text-sm text-gray-800">12/13</td>
                    <td className="py-2">
                      <div className="h-2 w-20 rounded-full bg-gray-200">
                        <div className="h-2 w-4/5 rounded-full bg-green-500"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-800">Ellie</td>
                    <td className="py-2 text-sm text-gray-800">한티초 3학년 3반</td>
                    <td className="py-2 text-sm text-gray-800">14/25</td>
                    <td className="py-2">
                      <div className="h-2 w-20 rounded-full bg-gray-200">
                        <div className="h-2 w-3/5 rounded-full bg-yellow-500"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-800">Mike</td>
                    <td className="py-2 text-sm text-gray-800">Max 3 의대반</td>
                    <td className="py-2 text-sm text-gray-800">0/24</td>
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder="하나고 2학년 3반"
                        className="rounded border px-2 py-1 text-xs"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-800">Jane Maddison</td>
                    <td className="py-2 text-sm text-gray-800">2025년 방학특...</td>
                    <td className="py-2 text-sm text-gray-800">0/13</td>
                    <td className="py-2">
                      <input
                        type="text"
                        placeholder="경기고..."
                        className="rounded border px-2 py-1 text-xs"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">완료된 과제</h3>
              <a href="#" className="text-sm text-blue-600">
                View All
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-800">대치초 3학년 3반</span>
                <span className="text-sm text-gray-600">2025.09.30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-800">대치초 3학년 3반</span>
                <span className="text-sm text-gray-600">2025.08.31</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-800">한티초 3학년 3반</span>
                <span className="text-sm text-gray-600">2025.08.15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Messages */}

          {/* Calendar */}
          <div className="rounded-xl bg-gray-200 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">October 2025</h3>
              <div className="flex space-x-2">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    i === 15 ? 'bg-pink-500 text-white' : 'bg-gray-300'
                  }`}
                >
                  {i > 6 && i < 32 ? i - 6 : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">공지사항</h3>
              <Plus className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="text-sm text-gray-800">학생들에게 보내는 메시지...</p>
                <p className="text-xs text-gray-600">2025 Oct 05</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-gray-800">학생들에게 보내는 메시지...</p>
                <p className="text-xs text-gray-600">2025 Sep 05</p>
              </div>
              <div>
                <p className="text-sm text-gray-800">학생들에게 보내는 메시지...</p>
                <p className="text-xs text-gray-600">2025 Aug 25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

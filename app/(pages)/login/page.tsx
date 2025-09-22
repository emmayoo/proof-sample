import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 둘러보기 링크 */}
      <div className="flex justify-end p-6">
        <Link
          href="/main"
          className="text-gray-600 hover:text-gray-800 underline decoration-gray-300 hover:decoration-gray-500 transition-colors duration-200 flex items-center gap-1"
        >
          둘러보기
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* 로고 섹션 */}
        <div className="mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center mb-4">
            <Image src="/puroo-logo.png" alt="PUROO" className="h-20 w-auto" />
          </div>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div
          className="w-full max-w-sm space-y-4 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          {/* 카카오톡 로그인 */}
          <button className="w-full bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover-lift">
            <Image src="/kakao.png" alt="KakaoTalk" className="w-6 h-6" />
            <span className="text-gray-800 font-medium">
              카카오톡으로 시작하기
            </span>
          </button>

          {/* 네이버 로그인 */}
          <button className="w-full bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover-lift">
            <Image src="/naver.png" alt="Naver" className="w-6 h-6" />
            <span className="text-gray-800 font-medium">네이버로 시작하기</span>
          </button>

          {/* 구글 로그인 */}
          <button className="w-full bg-white border border-gray-200 rounded-lg px-6 py-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover-lift">
            <Image src="/google.png" alt="Google" className="w-6 h-6" />
            <span className="text-gray-800 font-medium">구글로 시작하기</span>
          </button>
        </div>

        <div
          className="flex items-center gap-4 my-8 animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="text-gray-500 text-sm font-medium">OR</span>
        </div>

        <div
          className="flex items-center gap-4 animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/#"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            이메일로 가입
          </Link>
        </div>
      </div>
    </div>
  );
}

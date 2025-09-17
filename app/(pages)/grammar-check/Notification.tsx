import { RULES } from "@/app/data";


export default function Notification() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4 font-sans">
      <h3 className="text-sm font-semibold mb-2">
        현재 지원하는 맞춤법/문법/스타일 교정 목록
      </h3>
      <ul className="list-disc list-inside text-sm space-y-1">
        {RULES.map((rule, idx) => {
          const displayMatch =
            typeof rule.match === "string" ? rule.match : rule.match.source;
          return (
            <li key={idx}>
              <code
                className={
                  rule.type === "spelling"
                    ? "text-red-700"
                    : rule.type === "grammar"
                    ? "text-yellow-700"
                    : "text-blue-700"
                }
              >
                {displayMatch}
              </code>
              <span className="px-1">→</span>
              {rule.suggestion && (
                <code className="text-green-700">{rule.suggestion}</code>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

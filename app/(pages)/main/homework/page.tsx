import Link from 'next/link'

import { Plus } from 'lucide-react'

import { supabase } from '@/lib/supabaseClient'

export default async function HomeworkPage() {
  const { data: homeworks } = await supabase
    .from('homeworks')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">숙제 목록</h1>
        <Link
          href="/main/homework/new"
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>숙제 추가</span>
        </Link>
      </div>

      {homeworks?.map(p => (
        <Link key={p.id} href={`/main/homework/${p.id}`}>
          <div className="cursor-pointer rounded-lg border bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="mb-2 text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600">{new Date(p.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

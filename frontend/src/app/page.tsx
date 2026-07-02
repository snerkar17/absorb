import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome to Absorb</h1>
      <p>Signed in as {user.email}</p>
      <form action="/auth/signout" method="post">
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}

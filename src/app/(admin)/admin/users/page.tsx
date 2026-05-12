import { desc } from 'drizzle-orm'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db/client'
import { user } from '@/db/schema/auth'
import { requireAdmin } from '@/lib/admin/require-admin'

import { CreateUserDialog } from './CreateUserDialog'
import { UserRowActions } from './UserRowActions'

export const metadata = { title: 'Users' }

export default async function UsersPage() {
  const session = await requireAdmin()

  const users = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      banned: user.banned,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt))

  return (
    <main>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Access
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Only admins can sign in. Demoting a user to "user" preserves the account but
            blocks them from /admin/*.
          </p>
        </div>
        <CreateUserDialog />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="w-[20%]">Name</TableHead>
              <TableHead className="w-[10%]">Role</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[14%]">Created</TableHead>
              <TableHead className="w-[22%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.email}</TableCell>
                <TableCell className="text-sm text-zinc-600">{u.name}</TableCell>
                <TableCell>
                  <span
                    className={
                      u.role === 'admin'
                        ? 'rounded bg-zinc-900 px-2 py-0.5 text-xs font-medium text-white'
                        : 'rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700'
                    }
                  >
                    {u.role ?? 'user'}
                  </span>
                </TableCell>
                <TableCell>
                  {u.banned ? (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">
                      Banned
                    </span>
                  ) : (
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">
                      Active
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-zinc-500">
                  {u.createdAt.toISOString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  <UserRowActions
                    userId={u.id}
                    role={u.role ?? null}
                    banned={!!u.banned}
                    isSelf={u.id === session.user.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

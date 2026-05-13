import path from 'node:path'

export const UPLOADS_ROOT = path.resolve(process.cwd(), 'data/uploads')

// Private uploads (applicant documents, etc.) live in a separate root
// that is NOT served by the public /uploads/[...path] route. Access is
// gated by admin-only endpoints that stream the file directly.
export const PRIVATE_UPLOADS_ROOT = path.resolve(
  process.cwd(),
  'data/private-uploads',
)

export function publicPathFor(absoluteFilePath: string): string {
  const rel = path.relative(UPLOADS_ROOT, absoluteFilePath)
  return '/uploads/' + rel.split(path.sep).join('/')
}

export function absolutePathFor(publicPath: string): string {
  if (!publicPath.startsWith('/uploads/')) {
    throw new Error('Path must start with /uploads/')
  }
  const rel = publicPath.slice('/uploads/'.length)
  return path.resolve(UPLOADS_ROOT, rel)
}

export function privateAbsolutePathFor(storedPath: string): string {
  const absolute = path.resolve(PRIVATE_UPLOADS_ROOT, storedPath)
  if (
    absolute !== PRIVATE_UPLOADS_ROOT &&
    !absolute.startsWith(PRIVATE_UPLOADS_ROOT + path.sep)
  ) {
    throw new Error('Path traversal blocked')
  }
  return absolute
}

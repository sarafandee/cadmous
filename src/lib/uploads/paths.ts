import path from 'node:path'

export const UPLOADS_ROOT = path.resolve(process.cwd(), 'data/uploads')

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

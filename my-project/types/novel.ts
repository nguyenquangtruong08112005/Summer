export interface Chapter {
  title: string
  content: string
  updatedAt: string
}

export interface Novel {
  id: string
  title: string
  author: string
  description: string
  longDescription?: string
  coverImage?: string
  updatedAt: string
  chapters: Chapter[]
}

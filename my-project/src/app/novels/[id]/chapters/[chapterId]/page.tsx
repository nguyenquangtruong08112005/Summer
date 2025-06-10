"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useNovels } from "@/hooks/use-novels"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, List } from "lucide-react"
import { notFound } from "next/navigation"

interface ChapterPageProps {
  params: {
    id: string
    chapterId: string
  }
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const { getNovel, isLoading } = useNovels()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Đang tải...</p>
        </main>
        <Footer />
      </div>
    )
  }

  const novel = getNovel(params.id)
  const chapterIndex = Number.parseInt(params.chapterId) - 1

  if (!novel || chapterIndex < 0 || chapterIndex >= novel.chapters.length) {
    notFound()
  }

  const chapter = novel.chapters[chapterIndex]
  const prevChapter = chapterIndex > 0 ? chapterIndex : null
  const nextChapter = chapterIndex < novel.chapters.length - 1 ? chapterIndex + 2 : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/novels/${novel.id}`}>
                <List className="mr-2 h-4 w-4" /> Mục lục
              </Link>
            </Button>
            <h1 className="text-lg font-medium text-center">{novel.title}</h1>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Trang chủ
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-2">
              Chương {params.chapterId}: {chapter.title}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Cập nhật: {chapter.updatedAt}</p>

            <div className="prose dark:prose-invert max-w-none">
              {chapter.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            {prevChapter !== null ? (
              <Button asChild>
                <Link href={`/novels/${novel.id}/chapters/${prevChapter + 1}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Chương trước
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <Button variant="outline" asChild>
              <Link href={`/novels/${novel.id}`}>
                <List className="mr-2 h-4 w-4" /> Mục lục
              </Link>
            </Button>

            {nextChapter !== null ? (
              <Button asChild>
                <Link href={`/novels/${novel.id}/chapters/${nextChapter}`}>
                  Chương tiếp <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

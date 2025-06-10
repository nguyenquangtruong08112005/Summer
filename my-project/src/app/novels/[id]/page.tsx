"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useNovels } from "@/hooks/use-novels"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BookOpen, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

interface NovelPageProps {
  params: {
    id: string
  }
}

export default function NovelPage({ params }: NovelPageProps) {
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

  if (!novel) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-20">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={
                        novel.coverImage ||
                        `/placeholder.svg?height=600&width=400&text=${encodeURIComponent(novel.title) || "/placeholder.svg"}`
                      }
                      alt={novel.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    {novel.chapters.length > 0 && (
                      <>
                        <Button asChild size="lg" className="w-full">
                          <Link href={`/novels/${novel.id}/chapters/1`}>
                            <BookOpen className="mr-2 h-4 w-4" /> Đọc từ đầu
                          </Link>
                        </Button>
                        <Button variant="outline" asChild size="lg" className="w-full">
                          <Link href={`/novels/${novel.id}/chapters/${novel.chapters.length}`}>
                            Đọc chương mới nhất
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">{novel.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-1 h-4 w-4" />
                    {novel.author}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-1 h-4 w-4" />
                    {novel.chapters.length} chương
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Cập nhật: {novel.updatedAt}
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
                  <p>{novel.description}</p>
                  {novel.longDescription && <p>{novel.longDescription}</p>}
                </div>

                <h2 className="text-xl font-semibold mb-4">Danh sách chương</h2>
                {novel.chapters.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {novel.chapters.map((chapter, index) => (
                      <Card key={index} className="hover:bg-muted/50 transition-colors">
                        <Link href={`/novels/${novel.id}/chapters/${index + 1}`} className="block">
                          <CardHeader className="p-3">
                            <h3 className="text-base font-medium">
                              Chương {index + 1}: {chapter.title}
                            </h3>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <p className="text-sm text-muted-foreground">Cập nhật: {chapter.updatedAt}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Chưa có chương nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useNovels } from "@/hooks/use-novels"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function NovelsClientPage() {
  const { novels, isLoading } = useNovels()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNovels = novels.filter(
    (novel) =>
      novel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      novel.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookText className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <p>Đang tải...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col md:flex-row w-full justify-between md:items-center gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Tiểu Thuyết</h1>
                  <p className="text-gray-500 dark:text-gray-400">Khám phá tất cả tiểu thuyết trên trang</p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm tiểu thuyết..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6">
                {filteredNovels.map((novel) => (
                  <Card key={novel.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={
                          novel.coverImage ||
                          `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(novel.title) || "/placeholder.svg"}`
                        }
                        alt={novel.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1">{novel.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-2">{novel.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookText className="mr-1 h-4 w-4" />
                        {novel.chapters.length} chương
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/novels/${novel.id}`}>Đọc ngay</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredNovels.length === 0 && (
                <div className="text-center py-12 w-full">
                  <BookText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Không tìm thấy tiểu thuyết</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Thử tìm kiếm với từ khóa khác" : "Chưa có tiểu thuyết nào"}
                  </p>
                  {!searchTerm && (
                    <Button asChild>
                      <Link href="/admin/novels/new">Thêm tiểu thuyết đầu tiên</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

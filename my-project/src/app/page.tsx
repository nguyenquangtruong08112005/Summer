"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookText, ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeaturedNovel from "@/components/featured-novel"
import { useNovels } from "@/hooks/use-novels"

export default function Home() {
  const { novels, isLoading } = useNovels()

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

  const featuredNovels = novels.slice(0, 3)
  const recentNovels = novels.slice(0, 6)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Khám Phá Thế Giới Tiểu Thuyết
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Nơi chia sẻ những tác phẩm tiểu thuyết hay, đưa bạn đến với những cuộc phiêu lưu kỳ thú.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/novels">
                    Khám phá ngay <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Về chúng tôi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Novels */}
        {featuredNovels.length > 0 && (
          <section className="py-12 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Tiểu Thuyết Nổi Bật</h2>
                  <p className="text-gray-500 dark:text-gray-400">Những tác phẩm được yêu thích nhất</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {featuredNovels.map((novel) => (
                    <FeaturedNovel key={novel.id} novel={novel} />
                  ))}
                </div>
                <Button variant="outline" asChild className="mt-4 self-end">
                  <Link href="/novels">
                    Xem tất cả <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Recent Novels */}
        {recentNovels.length > 0 && (
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Mới Cập Nhật</h2>
                  <p className="text-gray-500 dark:text-gray-400">Những tác phẩm mới nhất trên trang</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                  {recentNovels.map((novel) => (
                    <Card key={novel.id} className="overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <img
                          src={
                            novel.coverImage ||
                            `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(novel.title) || "/placeholder.svg"}`
                          }
                          alt={novel.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1">{novel.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
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
                <Button variant="outline" asChild className="mt-4 self-end">
                  <Link href="/novels">
                    Xem tất cả <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {novels.length === 0 && (
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <div className="text-center">
                <BookText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Chưa có tiểu thuyết nào</h3>
                <p className="text-muted-foreground mb-6">Hãy thêm tiểu thuyết đầu tiên của bạn</p>
                <Button asChild>
                  <Link href="/admin/novels/new">Thêm tiểu thuyết</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNovels } from "@/hooks/use-novels"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Novel, Chapter } from "@/types/novel"
import { notFound } from "next/navigation"

interface EditNovelPageProps {
  params: {
    id: string
  }
}

export default function EditNovelPage({ params }: EditNovelPageProps) {
  const router = useRouter()
  const { getNovel, updateNovel, isLoading } = useNovels()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [novel, setNovel] = useState<Novel | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])

  useEffect(() => {
    if (!isLoading) {
      const foundNovel = getNovel(params.id)
      if (foundNovel) {
        setNovel(foundNovel)
        setChapters(
          foundNovel.chapters.length > 0
            ? foundNovel.chapters
            : [{ title: "", content: "", updatedAt: new Date().toLocaleDateString("vi-VN") }],
        )
      }
    }
  }, [params.id, getNovel, isLoading])

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

  if (!novel) {
    notFound()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const validChapters = chapters.filter((chapter) => chapter.title.trim() && chapter.content.trim())

      const updatedNovel: Novel = {
        ...novel,
        chapters: validChapters,
        updatedAt: new Date().toLocaleDateString("vi-VN"),
      }

      updateNovel(params.id, updatedNovel)
      router.push("/admin")
    } catch (error) {
      console.error("Error updating novel:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addChapter = () => {
    setChapters([...chapters, { title: "", content: "", updatedAt: new Date().toLocaleDateString("vi-VN") }])
  }

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index))
  }

  const updateChapter = (index: number, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map((chapter, i) => (i === index ? { ...chapter, [field]: value } : chapter))
    setChapters(updatedChapters)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Chỉnh sửa tiểu thuyết</h1>
                <p className="text-muted-foreground">Cập nhật thông tin và nội dung tiểu thuyết</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Tên tiểu thuyết *</Label>
                      <Input
                        id="title"
                        value={novel.title}
                        onChange={(e) => setNovel({ ...novel, title: e.target.value })}
                        placeholder="Nhập tên tiểu thuyết"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Tác giả *</Label>
                      <Input
                        id="author"
                        value={novel.author}
                        onChange={(e) => setNovel({ ...novel, author: e.target.value })}
                        placeholder="Nhập tên tác giả"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">URL ảnh bìa</Label>
                    <Input
                      id="coverImage"
                      value={novel.coverImage || ""}
                      onChange={(e) => setNovel({ ...novel, coverImage: e.target.value })}
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả ngắn *</Label>
                    <Textarea
                      id="description"
                      value={novel.description}
                      onChange={(e) => setNovel({ ...novel, description: e.target.value })}
                      placeholder="Mô tả ngắn gọn về tiểu thuyết"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Mô tả chi tiết</Label>
                    <Textarea
                      id="longDescription"
                      value={novel.longDescription || ""}
                      onChange={(e) => setNovel({ ...novel, longDescription: e.target.value })}
                      placeholder="Mô tả chi tiết về nội dung, nhân vật, bối cảnh..."
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Các chương</CardTitle>
                  <Button type="button" onClick={addChapter} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm chương
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {chapters.map((chapter, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Chương {index + 1}</h4>
                        {chapters.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeChapter(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-title-${index}`}>Tên chương</Label>
                        <Input
                          id={`chapter-title-${index}`}
                          value={chapter.title}
                          onChange={(e) => updateChapter(index, "title", e.target.value)}
                          placeholder="Nhập tên chương"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-content-${index}`}>Nội dung</Label>
                        <Textarea
                          id={`chapter-content-${index}`}
                          value={chapter.content}
                          onChange={(e) => updateChapter(index, "content", e.target.value)}
                          placeholder="Nhập nội dung chương..."
                          rows={10}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin">Hủy</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Đang lưu..." : "Cập nhật tiểu thuyết"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Star } from "lucide-react"
import type { Novel } from "@/types/novel"

interface FeaturedNovelProps {
  novel: Novel
}

export default function FeaturedNovel({ novel }: FeaturedNovelProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="aspect-[16/9] relative">
        <img
          src={novel.coverImage || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(novel.title)}`}
          alt={novel.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Nổi bật
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{novel.title}</CardTitle>
        <CardDescription>{novel.author}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{novel.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="mr-1 h-4 w-4" />
          {novel.chapters.length} chương
        </div>
        <Button asChild>
          <Link href={`/novels/${novel.id}`}>Đọc ngay</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

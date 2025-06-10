import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen, Menu, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl hidden md:inline-block">Trang Tiểu Thuyết</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Trang chủ
          </Link>
          <Link href="/novels" className="text-sm font-medium hover:underline underline-offset-4">
            Tiểu thuyết
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            Giới thiệu
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4 text-primary">
            Quản lý
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href="/admin">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Quản lý</span>
            </Link>
          </Button>
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:underline underline-offset-4">
                  Trang chủ
                </Link>
                <Link href="/novels" className="text-lg font-medium hover:underline underline-offset-4">
                  Tiểu thuyết
                </Link>
                <Link href="/about" className="text-lg font-medium hover:underline underline-offset-4">
                  Giới thiệu
                </Link>
                <Link href="/admin" className="text-lg font-medium hover:underline underline-offset-4 text-primary">
                  Quản lý
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

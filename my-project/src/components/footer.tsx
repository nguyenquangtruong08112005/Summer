import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 md:h-24 md:py-0">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <span className="font-semibold">Trang Tiểu Thuyết</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm text-muted-foreground mt-6 md:mt-0">
          <Link href="/" className="hover:underline underline-offset-4">
            Trang chủ
          </Link>
          <Link href="/novels" className="hover:underline underline-offset-4">
            Tiểu thuyết
          </Link>
          <Link href="/about" className="hover:underline underline-offset-4">
            Giới thiệu
          </Link>
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Trang Tiểu Thuyết. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  )
}

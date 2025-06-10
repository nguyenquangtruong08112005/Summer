import Header from "@/components/header"
import Footer from "@/components/footer"
import { BookOpen, Mail, User } from "lucide-react"

export const metadata = {
  title: "Giới thiệu",
  description: "Thông tin về trang tiểu thuyết",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <BookOpen className="h-12 w-12 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Về Trang Tiểu Thuyết</h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Nơi chia sẻ những tác phẩm tiểu thuyết hay, đưa bạn đến với những cuộc phiêu lưu kỳ thú.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Câu chuyện của chúng tôi</h2>
                <p>
                  Trang Tiểu Thuyết được thành lập với mục tiêu tạo ra một không gian nơi các tác giả có thể chia sẻ tác
                  phẩm của mình với độc giả trên khắp thế giới. Chúng tôi tin rằng mỗi câu chuyện đều có giá trị và xứng
                  đáng được kể.
                </p>
                <p>
                  Từ những tiểu thuyết lãng mạn đến những câu chuyện phiêu lưu kỳ ảo, từ những tác phẩm trinh thám gay
                  cấn đến những câu chuyện đời thường đầy cảm xúc, trang web của chúng tôi là nơi bạn có thể tìm thấy
                  mọi thể loại tiểu thuyết phù hợp với sở thích của mình.
                </p>
                <p>
                  Chúng tôi không ngừng nỗ lực để mang đến cho độc giả trải nghiệm đọc tốt nhất, với giao diện thân
                  thiện, dễ sử dụng và tối ưu cho việc đọc trên mọi thiết bị.
                </p>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h2>Sứ mệnh của chúng tôi</h2>
                <p>
                  Sứ mệnh của chúng tôi là kết nối các tác giả với độc giả, tạo ra một cộng đồng yêu thích văn học nơi
                  mọi người có thể chia sẻ, thảo luận và tận hưởng những câu chuyện hay.
                </p>
                <p>Chúng tôi cam kết:</p>
                <ul>
                  <li>Cung cấp một nền tảng ổn định, dễ sử dụng cho cả tác giả và độc giả</li>
                  <li>Hỗ trợ các tác giả trong việc chia sẻ tác phẩm của họ</li>
                  <li>Tạo ra một môi trường thân thiện, tôn trọng cho cộng đồng</li>
                  <li>Không ngừng cải tiến để mang đến trải nghiệm tốt nhất</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-center mb-8">Liên hệ với chúng tôi</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center md:items-start">
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tác giả</h3>
                <p className="text-muted-foreground">
                  Bạn là tác giả và muốn đăng tải tác phẩm của mình? Hãy liên hệ với chúng tôi để được hướng dẫn.
                </p>
              </div>
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">
                  Gửi email cho chúng tôi theo địa chỉ: <br />
                  <a href="mailto:contact@trangtieuthuyet.com" className="text-primary hover:underline">
                    contact@trangtieuthuyet.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

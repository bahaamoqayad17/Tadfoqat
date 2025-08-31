import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Font demonstration */}
      <div className="row-start-2 w-full max-w-2xl mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Tajawal Font Demonstration
        </h2>
        <div className="space-y-2 text-center">
          <p className="font-light text-lg">
            Light (300) - This is Tajawal Light
          </p>
          <p className="font-normal text-lg">
            Regular (400) - This is Tajawal Regular
          </p>
          <p className="font-medium text-lg">
            Medium (500) - This is Tajawal Medium
          </p>
          <p className="font-bold text-lg">Bold (700) - This is Tajawal Bold</p>
          <p className="font-extrabold text-lg">
            Extra Bold (800) - This is Tajawal Extra Bold
          </p>
          <p className="font-black text-lg">
            Black (900) - This is Tajawal Black
          </p>
        </div>
      </div>

      {/* Color demonstration */}
      <div className="row-start-2 w-full max-w-4xl mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Color Palette Demonstration
        </h2>

        {/* Primary Colors */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Primary Colors
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
                Primary
              </div>
              <p className="text-xs text-muted-foreground">#197BBD</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
                Secondary
              </div>
              <p className="text-xs text-muted-foreground">#10B981</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
                Accent
              </div>
              <p className="text-xs text-muted-foreground">#197BBD</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-destructive rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">
                Destructive
              </div>
              <p className="text-xs text-muted-foreground">#EF4444</p>
            </div>
          </div>
        </div>

        {/* Gray Scale */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Gray Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D0D0D] rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs">
                Black
              </div>
              <p className="text-xs text-muted-foreground">#0D0D0D</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#505050] rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs">
                Gray
              </div>
              <p className="text-xs text-muted-foreground">#505050</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#777777] rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs">
                Light Gray
              </div>
              <p className="text-xs text-muted-foreground">#777777</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg mx-auto mb-2 flex items-center justify-center text-foreground font-bold text-xs">
                Border
              </div>
              <p className="text-xs text-muted-foreground">#E5E7EB</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-lg mx-auto mb-2 flex items-center justify-center text-foreground font-bold text-xs border border-border">
                Lightest
              </div>
              <p className="text-xs text-muted-foreground">#F9FAFB</p>
            </div>
          </div>
        </div>

        {/* Color Usage Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Color Usage Examples
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-primary font-medium">Primary text color</p>
              <p className="text-secondary font-medium">Secondary text color</p>
              <p className="text-muted-foreground">Muted text color</p>
              <p className="text-accent font-medium">Accent text color</p>
            </div>
            <div className="space-y-2">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full">
                Primary Button
              </button>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors w-full">
                Secondary Button
              </button>
              <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors w-full">
                Accent Button
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

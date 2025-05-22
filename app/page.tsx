import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PageRegistry } from "@/lib/registry";
import Link from "next/link";

export default function Page() {
  const keys = Object.keys(PageRegistry);

  console.log(`[page] keys:`, keys);

  return (
    <main className="bg-sidebar">
      <Container className="[&>div]:p-0 [&>div]:h-32" />

      <Container>
        <nav className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-4xl font-semibold tracking-tight">
              Web Blocks
            </h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                Github
              </Button>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-muted-foreground">
            Floating UI provides a toolkit of positioning features that let you
            robustly anchor an absolutely-positioned floating element next to a
            given reference element.
          </p>
        </nav>
      </Container>
      {keys.map((key) => {
        return (
          <Container key={key}>
            <div>
              <Link
                href={`/view/${key}`}
                className="block w-full aspect-video border rounded overflow-hidden"
              >
                <img
                  src="/images/preview-light.png"
                  alt="Dashboard"
                  className="w-full h-full object-cover dark:hidden"
                />
                <img
                  src="/images/preview-dark.png"
                  alt="Dashboard"
                  className=" w-full h-full object-cover hidden dark:block"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between pt-4 px-2">
              <h3 className="text-xl font-medium capitalize">{key}</h3>
              <div>
                <p>Demo</p>
              </div>
            </div>
          </Container>
        );
      })}

      <Container className="border-none relative overflow-hidden">
        <div
          className="
            absolute
            -bottom-14
            left-1/2
            -translate-x-1/2
    overflow-hidden
    [mask-image:linear-gradient(to_top,black,transparent_80%)]
    [mask-repeat:no-repeat]
    [mask-size:100%_100%]
  "
        >
          <p className="text-center text-[13rem] font-bold tracking-tighter leading-none font-outline text-transparent text-border_">
            blocks
          </p>
        </div>
      </Container>
    </main>
  );
}

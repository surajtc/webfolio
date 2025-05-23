import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageRegistry } from "@/lib/registry";
import { ArrowUpRightIcon, StarIcon, StarsIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const keys = Object.keys(PageRegistry);

  return (
    <main className="bg-sidebar">
      <Container className="[&>div]:p-0 [&>div]:h-32" />

      <Container>
        <nav className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold tracking-tight">Webfolio</h3>
            <Button
              variant="secondary"
              className="rounded-full cursor-pointer has-[>svg]:px-4"
            >
              Github
              <ArrowUpRightIcon className="" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            An open-source collection of web page implementations and UI
            experiments
          </p>
        </nav>
      </Container>
      {keys.map((key) => {
        return (
          <Container key={key}>
            <div>
              <Link
                href={`/view/${key}`}
                className="block w-full aspect-video border rounded-lg overflow-hidden hover:border-input"
              >
                <img
                  src={`/images/${key}.png`}
                  alt={key}
                  className="w-full h-full object-cover dark:hidden"
                />
                <img
                  src={`/images/${key}-dark.png`}
                  alt={key}
                  className=" w-full h-full object-cover hidden dark:block"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between pt-2 px-2">
              <h3 className="font-medium capitalize">{key}</h3>
              <div>
                <Link
                  href={`/view/${key}`}
                  className={buttonVariants({ variant: "link", size: "sm" })}
                >
                  View
                  <ArrowUpRightIcon className="" />
                </Link>
              </div>
            </div>
          </Container>
        );
      })}

      <Container className="border-none relative overflow-hidden">
        <div
          className="
            absolute
            -bottom-8
            left-1/2
            -translate-x-1/2
    overflow-hidden
    [mask-image:linear-gradient(to_top,black,transparent_80%)]
    [mask-repeat:no-repeat]
    [mask-size:100%_100%]
  "
        >
          <p className="text-center text-[8rem] font-bold tracking-tighter leading-none font-outline text-transparent text-border_">
            webfolio
          </p>
        </div>
      </Container>
    </main>
  );
}

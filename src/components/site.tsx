import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ArrowUpRight, Code2, Copy, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Claim, ProjectImage } from "@/content/projects";
import { cn } from "@/lib/utils";

export const EMAIL = "2292110346@qq.com";

const navItems = [
  { label: "项目", href: "/#projects" },
  { label: "公开工程", href: "/#engineering" },
  { label: "联系", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <div className="page-shell flex h-[4.5rem] items-center justify-between">
        <a href="/" className="group flex items-center gap-3" aria-label="南山南首页">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            南
          </span>
          <span className="text-sm font-medium tracking-[-0.02em]">南山南</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="主要导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/AoHanBei"
            target="_blank"
            rel="noreferrer"
            className="nav-link inline-flex items-center gap-1.5"
          >
            GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="打开菜单">
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="pr-14 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Navigation / 导航
              </SheetTitle>
              <nav className="mt-16 grid" aria-label="移动端导航">
                {navItems.map((item, index) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="flex min-h-16 items-center justify-between border-t border-border text-2xl font-medium tracking-[-0.04em] last:border-b"
                    >
                      {item.label}
                      <span className="text-xs tabular-nums text-primary">0{index + 1}</span>
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <a
                href="https://github.com/AoHanBei"
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-medium"
              >
                <Code2 className="size-4" aria-hidden="true" /> GitHub / AoHanBei
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ label = "Portfolio / 2026" }: { label?: string }) {
  return (
    <footer className="page-shell flex min-h-28 flex-col justify-center gap-3 border-t border-border py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>南山南 · {label}</span>
      <div className="flex items-center gap-6">
        <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
        <a href="#main" className="inline-flex items-center gap-1 hover:text-foreground">
          返回顶部 <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export function PageFrame({ children, footerLabel }: { children: ReactNode; footerLabel?: string }) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0"
      >
        跳到主要内容
      </a>
      <SiteHeader />
      {children}
      <SiteFooter label={footerLabel} />
    </>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  inverse = false,
  titleClassName,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
  titleClassName?: string;
}) {
  return (
    <header
      className={cn(
        "grid grid-cols-[minmax(0,1fr)] gap-7 border-t pt-5 md:grid-cols-[minmax(8rem,.34fr)_minmax(0,1fr)] md:gap-12",
        inverse ? "border-primary-foreground/20" : "border-border",
      )}
      data-reveal
    >
      <div className="flex items-start gap-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <span className={cn("tabular-nums", inverse && "text-primary-foreground/60")}>{index}</span>
        <span className={cn(inverse && "text-primary-foreground/60")}>{eyebrow}</span>
      </div>
      <div className="max-w-4xl">
        <h2 className={cn("display-title text-balance", inverse && "text-primary-foreground", titleClassName)}>{title}</h2>
        {description ? (
          <p className={cn("mt-5 max-w-2xl text-pretty text-base leading-8 text-muted-foreground", inverse && "text-primary-foreground/62")}>{description}</p>
        ) : null}
      </div>
    </header>
  );
}

export function ClaimText({ claim, className }: { claim: Claim; className?: string }) {
  return (
    <p className={className} data-claim-id={claim.id}>
      {claim.text}
    </p>
  );
}

export function ScreenshotFrame({
  image,
  eager = false,
  className,
  showCaption = true,
  index,
}: {
  image: ProjectImage;
  eager?: boolean;
  className?: string;
  showCaption?: boolean;
  index?: string;
}) {
  return (
    <figure className={cn("group min-w-0", className)} data-reveal>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="screenshot-frame block w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card text-left shadow-[0_22px_70px_-48px_var(--shadow-color)] outline-none transition-colors duration-150 hover:border-foreground/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`放大查看${image.alt}`}
          >
            <img
              src={image.src}
              width="1600"
              height="1000"
              alt={image.alt}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : "auto"}
              className="aspect-[8/5] w-full object-contain"
            />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/78 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,92rem)] -translate-x-1/2 -translate-y-1/2 outline-none">
            <Dialog.Title className="sr-only">{image.title}</Dialog.Title>
            <img
              src={image.src}
              width="1600"
              height="1000"
              alt={image.alt}
              className="max-h-[88vh] w-full rounded-[var(--radius-lg)] bg-card object-contain shadow-2xl"
            />
            <Dialog.Close className="absolute -top-3 right-0 grid size-11 -translate-y-full place-items-center rounded-full border border-background/20 bg-foreground text-background transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background">
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">关闭大图</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {showCaption ? (
        <figcaption className="grid gap-3 border-b border-border py-4 sm:grid-cols-[4rem_minmax(0,1fr)]">
          <span className="text-[0.68rem] font-medium tabular-nums text-primary">{index ?? "FIG."}</span>
          <div>
            <h3 className="text-sm font-semibold tracking-[-0.02em]">{image.title}</h3>
            <ClaimText claim={image.caption} className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground" />
          </div>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="border-primary/25 bg-primary/7 text-primary">案例已收录</Badge>
      <Badge>源码整理中</Badge>
    </div>
  );
}

export function ArrowLink({ children, href, external = false, className }: { children: ReactNode; href: string; external?: boolean; className?: string }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn("arrow-link group inline-flex min-h-11 items-center gap-2 text-sm font-semibold", className)}
    >
      {children}
      {external ? <ArrowUpRight className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
    </a>
  );
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <Button onClick={copyEmail} size="lg">
      {copied ? "已复制" : "复制邮箱"}
      <Copy className="size-4" aria-hidden="true" />
    </Button>
  );
}

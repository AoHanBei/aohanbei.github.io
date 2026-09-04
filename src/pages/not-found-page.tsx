import { ArrowLeft } from "lucide-react";

import { PageFrame } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

export function NotFoundPage() {
  useReveal();

  return (
    <PageFrame footerLabel="404 / Archive gap">
      <main id="main" className="page-shell grid min-h-[calc(100svh-11.5rem)] grid-cols-[minmax(0,1fr)] content-center gap-10 py-16 lg:grid-cols-[minmax(12rem,.55fr)_minmax(0,1fr)] lg:items-center">
        <p className="select-none text-[clamp(9rem,25vw,22rem)] font-semibold leading-[.68] tracking-[-0.1em] text-border" aria-hidden="true" data-reveal>404</p>
        <div className="max-w-2xl" data-reveal>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-primary">Archive gap / 档案缺页</p>
          <h1 className="display-title mt-7 text-balance">这页不在当前档案里。</h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">链接可能已经移动，或者页面仍在整理。你可以回到首页继续查看完整项目案例。</p>
          <Button asChild size="lg" className="mt-9">
            <a href="/"><ArrowLeft className="size-4" aria-hidden="true" /> 返回作品集</a>
          </Button>
        </div>
      </main>
    </PageFrame>
  );
}

import { ArrowLeft } from "lucide-react";

import { PageFrame } from "@/components/site";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

export function NotFoundPage() {
  useReveal();

  return (
    <PageFrame footerLabel="404">
      <main id="main" className="page-shell grid min-h-[calc(100svh-11.5rem)] grid-cols-[minmax(0,1fr)] content-center gap-10 py-16 lg:grid-cols-[minmax(12rem,.55fr)_minmax(0,1fr)] lg:items-center">
        <p className="select-none text-[clamp(9rem,25vw,22rem)] font-semibold leading-[.68] tracking-[-0.1em] text-border" aria-hidden="true" data-reveal>404</p>
        <div className="max-w-2xl" data-reveal>
          <p className="text-sm font-medium text-primary">页面未找到</p>
          <h1 className="display-title mt-7 text-balance">这个页面不存在。</h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">链接可能已经移动。回到首页可以看到全部项目、开源贡献和联系方式。</p>
          <Button asChild size="lg" className="mt-9">
            <a href="/"><ArrowLeft className="size-4" aria-hidden="true" /> 回到首页</a>
          </Button>
        </div>
      </main>
    </PageFrame>
  );
}

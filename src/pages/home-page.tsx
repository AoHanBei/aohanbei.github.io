import { ArrowDown, ArrowUpRight, Check, GitPullRequest } from "lucide-react";
import type { CSSProperties } from "react";

import {
  ArrowLink,
  ClaimText,
  CopyEmailButton,
  EMAIL,
  PageFrame,
  SectionHeading,
} from "@/components/site";
import { Button } from "@/components/ui/button";
import { contributions } from "@/content/contributions";
import { projectHref, projects } from "@/content/projects";
import { useReveal } from "@/hooks/use-reveal";

const featuredContributionNumbers = new Set([5127, 4933, 4752]);

export function HomePage() {
  useReveal();

  const [modelport, quantpilot, memory] = projects;
  const featuredContributions = contributions.filter((item) => featuredContributionNumbers.has(item.number));

  return (
    <PageFrame>
      <main id="main">
        <section className="hero-shell page-shell relative grid grid-cols-[minmax(0,1fr)] items-center gap-10 overflow-hidden py-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(28rem,.96fr)] lg:py-16">
          <div className="relative z-10 min-w-0 max-w-3xl" data-reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-primary">Portfolio / 2026</span>
              <span>LLM Application Engineer</span>
            </div>
            <p className="mb-4 text-sm font-medium tracking-[-0.01em]">南山南 · 大模型应用开发工程师</p>
            <h1 className="hero-title">
              <span className="block">把大模型能力，</span>
              <span className="block"><span className="text-primary">推进为</span>可运行、</span>
              <span className="block">可验证的系统。</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
              聚焦模型接入治理、Agent 工作流与用户记忆基础设施。这里展示的不只是界面，也包括系统边界、工程取舍与公开可查的工程记录。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#projects">
                  查看精选项目 <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`mailto:${EMAIL}`}>
                  联系我 <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <ol className="hero-focus-list mt-10 grid max-w-2xl grid-cols-1 sm:grid-cols-3" aria-label="工程能力方向">
              {["模型接入与治理", "Agent 任务编排", "数据、记忆与评测"].map((item, index) => (
                <li key={item} className="flex items-center justify-between gap-4 py-3 text-xs font-medium sm:block sm:px-4 sm:first:pl-0">
                  <span>{item}</span>
                  <span className="mt-2 block text-[0.62rem] tabular-nums text-primary">0{index + 1}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="hero-contact-sheet relative mx-auto aspect-[5/5.05] w-full max-w-[44rem] lg:mr-[-2vw]" aria-label="三个项目的真实界面截图" data-reveal>
            <a href={projectHref(modelport.slug)} className="hero-shot hero-shot-primary group" aria-label="查看 ModelPort 案例">
              <span className="hero-shot-label">01 / ModelPort</span>
              <img src={modelport.heroImage.src} width="1600" height="1000" alt={modelport.heroImage.alt} fetchPriority="high" />
            </a>
            <a href={projectHref(quantpilot.slug)} className="hero-shot hero-shot-secondary group" aria-label="查看 QuantPilot 案例">
              <span className="hero-shot-label">02 / QuantPilot</span>
              <img src={quantpilot.heroImage.src} width="1600" height="1000" alt={quantpilot.heroImage.alt} />
            </a>
            <a href={projectHref(memory.slug)} className="hero-shot hero-shot-tertiary group" aria-label="查看 Evolvable User Memory 案例">
              <span className="hero-shot-label">03 / User Memory</span>
              <img src={memory.heroImage.src} width="1600" height="1000" alt={memory.heroImage.alt} />
            </a>
            <aside className="hero-proof-card" aria-label="公开工程记录概览">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <span>Public record</span>
                <span className="inline-flex items-center gap-1 text-primary"><Check className="size-3" /> Verified</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-2xl font-semibold tabular-nums tracking-[-0.06em]">05</dt>
                  <dd className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.1em] text-muted-foreground">Merged PRs</dd>
                </div>
                <div>
                  <dt className="text-2xl font-semibold tabular-nums tracking-[-0.06em]">09</dt>
                  <dd className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.1em] text-muted-foreground">Product screens</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="trust-band" aria-label="作品集可信数据">
          <dl className="page-shell grid grid-cols-2 lg:grid-cols-4">
            {[
              ["03", "工程系统", "Selected systems"],
              ["09", "真实截图", "Product evidence"],
              ["05", "合并贡献", "Merged pull requests"],
              ["03", "工程主线", "System disciplines"],
            ].map(([value, label, note], index) => (
              <div key={label} className="trust-stat" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}>
                <dt className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tabular-nums tracking-[-0.07em] text-primary sm:text-5xl">{value}</span>
                  <span className="text-sm font-medium text-background">{label}</span>
                </dt>
                <dd className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-background/48">{note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="projects" className="page-shell scroll-mt-24 py-section">
          <SectionHeading
            index="01"
            eyebrow="Selected projects / 精选项目"
            title="三个系统，三条真实工程边界。"
            description="从协议治理、任务编排到结果感知记忆，首页快速说明项目如何成立；完整生命周期、取舍与证据留在工程档案中。"
          />

          <article className="featured-project mt-12 grid min-w-0 overflow-hidden lg:grid-cols-12" data-reveal>
            <a href={projectHref(modelport.slug)} className="project-media group lg:col-span-7" aria-label="查看 ModelPort 案例">
              <img src={modelport.heroImage.src} width="1600" height="1000" alt={modelport.heroImage.alt} loading="lazy" />
            </a>
            <div className="flex min-w-0 flex-col p-6 sm:p-9 lg:col-span-5 lg:p-10">
              <div className="flex items-center justify-between border-b border-border pb-3 text-[0.62rem] font-medium uppercase tracking-[0.13em] text-muted-foreground">
                <span className="tabular-nums text-primary">Build / {modelport.order}</span>
                <span>{modelport.category}</span>
              </div>
              <div className="my-auto py-10">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary">主项目 · {modelport.categoryZh}</p>
                <h3 className="featured-project-title mt-3 text-balance"><a href={projectHref(modelport.slug)}>{modelport.name}</a></h3>
                <ClaimText claim={modelport.summary} className="mt-6 text-pretty text-base leading-8 text-muted-foreground" />
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label={`${modelport.name} 技术范围`}>
                  {modelport.tags.map((tag) => <li key={tag}>/ {tag}</li>)}
                </ul>
              </div>
              <ArrowLink href={projectHref(modelport.slug)}>阅读完整工程档案</ArrowLink>
            </div>
          </article>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {[quantpilot, memory].map((project, index) => (
              <article key={project.slug} className="secondary-project min-w-0 overflow-hidden" data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                <a href={projectHref(project.slug)} className="project-media group block" aria-label={`查看 ${project.name} 案例`}>
                  <img src={project.heroImage.src} width="1600" height="1000" alt={project.heroImage.alt} loading="lazy" />
                </a>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-border pb-3 text-[0.62rem] font-medium uppercase tracking-[0.13em] text-muted-foreground">
                    <span className="tabular-nums text-primary">Build / {project.order}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 className="secondary-project-title mt-7 text-balance"><a href={projectHref(project.slug)}>{project.name}</a></h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-primary">{project.categoryZh}</p>
                  <ClaimText claim={project.summary} className="mt-5 text-pretty text-sm leading-7 text-muted-foreground" />
                  <div className="mt-7"><ArrowLink href={projectHref(project.slug)}>查看完整案例</ArrowLink></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="engineering" className="page-shell scroll-mt-24 pb-section">
          <SectionHeading
            index="02"
            eyebrow="Public engineering / 公开工程"
            title="工程判断，应该留下公开记录。"
            description="从问题复现、最小修复到确定性回归测试，以下贡献均已合并至字节跳动 DeerFlow，可直接查看代码、验证与讨论。"
          />

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {featuredContributions.map((contribution, index) => (
              <a
                key={contribution.number}
                href={contribution.url}
                target="_blank"
                rel="noreferrer"
                className="contribution-card group"
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-4 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><GitPullRequest className="size-3.5 text-primary" /> Merged PR</span>
                  <span className="tabular-nums text-primary">#{contribution.number}</span>
                </div>
                <div className="mt-7">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.13em] text-primary">{contribution.area}</p>
                  <h3 className="mt-2 text-balance text-[clamp(1.15rem,1.7vw,1.5rem)] font-semibold leading-[1.12] tracking-[-0.035em]">{contribution.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{contribution.summary}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold">
                  查看 PR <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>

          <div className="public-record-note mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-reveal>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              公开协作覆盖 Agent 可观测性、MCP 任务生命周期与异步通道关闭边界；首页只保留三个代表性记录。
            </p>
            <ArrowLink href="https://github.com/AoHanBei" external>查看全部 GitHub 记录</ArrowLink>
          </div>
        </section>

        <section id="contact" className="page-shell scroll-mt-24 pb-section">
          <div className="contact-panel grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end" data-reveal>
            <div>
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-primary">03 / Contact</span>
              <h2 className="contact-title mt-8 max-w-4xl text-balance">有值得一起推进的系统吗？</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">欢迎交流大模型应用、Agent 工程、开源协作，或一个仍需要被工程化的问题。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CopyEmailButton />
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/AoHanBei" target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="border-t border-border pt-5 text-sm text-muted-foreground lg:col-span-2">
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary">{EMAIL}</a>
            </p>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

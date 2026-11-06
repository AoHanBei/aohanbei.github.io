import { ArrowDown, ArrowRight, ArrowUpRight, GitPullRequest, Star } from "lucide-react";
import type { CSSProperties } from "react";

import {
  ArrowLink,
  ClaimText,
  CopyEmailButton,
  EMAIL,
  PageFrame,
  ProjectMeta,
  SectionHeading,
} from "@/components/site";
import { Button } from "@/components/ui/button";
import { contributionRepos, contributionsVerifiedOn, mergedPrCount, prUrl } from "@/content/contributions";
import { internship, profile } from "@/content/profile";
import { projectHref, projects, type Project } from "@/content/projects";
import { skills } from "@/content/skills";
import { useReveal } from "@/hooks/use-reveal";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
      <ArrowLink href={projectHref(project.slug)}>案例详情</ArrowLink>
      {project.repositoryUrl ? (
        <ArrowLink href={project.repositoryUrl} external className="text-muted-foreground hover:text-foreground">
          GitHub
        </ArrowLink>
      ) : null}
    </div>
  );
}

function ProjectTitle({ project, className }: { project: Project; className: string }) {
  return (
    <>
      <h3 className={className}>
        <a href={projectHref(project.slug)}>{project.name}</a>
      </h3>
      {project.alias ? (
        <p className="mt-1.5 text-sm text-muted-foreground">
          原项目 <span lang="en" className="font-medium text-foreground">{project.alias}</span>
        </p>
      ) : null}
    </>
  );
}

export function HomePage() {
  useReveal();

  const [modelport, memory, quantpilot] = projects;
  const stats: Array<[string, string]> = [
    ["2", "主力项目"],
    ["2", "参与的开源项目"],
    [String(mergedPrCount), "已合并 PR"],
    ["1", "段大模型网关实习"],
  ];

  return (
    <PageFrame>
      <main id="main">
        <section className="hero-shell page-shell relative grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)] lg:py-16">
          <div className="relative z-10 min-w-0 max-w-2xl" data-reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="text-sm font-medium">
                {profile.name} · {profile.role}
              </p>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {profile.status}
              </span>
            </div>
            <h1 className="hero-title mt-7">
              <span className="block">做模型网关、</span>
              <span className="block"><span lang="en">Agent</span> 运行时</span>
              <span className="block">与用户记忆的工程师</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-[1.0625rem] sm:leading-9">
              实习中参与内网大模型网关开发，并把它独立整理成开源的 ModelPort；个人项目做可溯源、可受控更新的用户记忆服务；在 DeerFlow 与 DeepTutor 合并了 {mergedPrCount} 个修复与增强。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#projects">
                  查看项目 <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="hero-contact-sheet relative mx-auto w-full max-w-[44rem] lg:mr-[-1vw]" aria-label="三个项目的界面截图" data-reveal>
            {[
              [modelport, "hero-shot-primary", true],
              [memory, "hero-shot-secondary", false],
              [quantpilot, "hero-shot-tertiary", false],
            ].map(([project, position, eager]) => {
              const item = project as Project;
              return (
                <a key={item.slug} href={projectHref(item.slug)} className={`hero-shot ${position as string}`} aria-label={`查看 ${item.name} 案例`}>
                  <span className="hero-shot-label">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">{item.status}</span>
                  </span>
                  <img
                    src={item.heroImage.src}
                    width="1600"
                    height="1000"
                    alt={item.heroImage.alt}
                    fetchPriority={eager ? "high" : "auto"}
                  />
                </a>
              );
            })}
          </div>
        </section>

        <section className="trust-band" aria-label="经历概览">
          <dl className="page-shell grid grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label], index) => (
              <div key={label} className="trust-stat" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="order-first text-4xl font-semibold tabular-nums tracking-[-0.05em] text-foreground sm:text-5xl">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="skills" className="page-shell scroll-mt-24 pt-section" aria-label="能力">
          <ol className="skill-grid">
            {skills.map((skill, index) => (
              <li key={skill.title} className="skill-cell" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}>
                <p className="text-xs font-medium tabular-nums text-primary" lang="en">0{index + 1}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{skill.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{skill.body}</p>
                <ul className="mt-5 grid gap-1 border-t border-border pt-4">
                  {skill.evidence.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="skill-evidence"
                      >
                        <span>{item.label}</span>
                        {item.external ? <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" /> : <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="page-shell scroll-mt-24 py-section">
          <SectionHeading
            label="项目"
            title="两个主力项目，一个在学的项目。"
            description="每个案例页都写清楚要防什么事故、用什么机制防住，以及当前版本不承诺什么。"
          />

          <article className="featured-project mt-12 grid min-w-0 overflow-hidden lg:grid-cols-12" data-reveal>
            <a href={projectHref(modelport.slug)} className="project-media group lg:col-span-7" aria-label={`查看 ${modelport.name} 案例`}>
              <img src={modelport.heroImage.src} width="1600" height="1000" alt={modelport.heroImage.alt} loading="lazy" />
            </a>
            <div className="flex min-w-0 flex-col gap-8 p-6 sm:p-9 lg:col-span-5 lg:p-10">
              <ProjectMeta project={modelport} />
              <div className="my-auto">
                <p className="text-sm font-medium text-primary">{modelport.category}</p>
                <ProjectTitle project={modelport} className="featured-project-title mt-2 text-balance" />
                <ClaimText claim={modelport.summary} className="mt-5 text-pretty text-base leading-8 text-muted-foreground" />
              </div>
              <ProjectLinks project={modelport} />
            </div>
          </article>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {[memory, quantpilot].map((project, index) => (
              <article
                key={project.slug}
                className="secondary-project flex min-w-0 flex-col overflow-hidden"
                data-kind={project.kind}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <a href={projectHref(project.slug)} className="project-media group block" aria-label={`查看 ${project.name} 案例`}>
                  <img src={project.heroImage.src} width="1600" height="1000" alt={project.heroImage.alt} loading="lazy" />
                </a>
                <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                  <ProjectMeta project={project} />
                  <div>
                    <p className="text-sm font-medium text-primary">{project.category}</p>
                    <ProjectTitle project={project} className="secondary-project-title mt-2 text-balance" />
                    <ClaimText claim={project.summary} className="mt-4 text-pretty text-sm leading-7 text-muted-foreground" />
                  </div>
                  <div className="mt-auto">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="open-source" className="page-shell scroll-mt-24 pb-section">
          <SectionHeading
            label="开源贡献"
            title={`${mergedPrCount} 个已合并的修复与增强。`}
            description="集中在 Agent 运行时和模型调用链路的可靠性问题上，每条都附带回归测试，可以直接点开 PR 查看代码与讨论。"
            aside={<p className="text-xs tabular-nums text-muted-foreground">PR 与 Star 数核对于 {contributionsVerifiedOn}</p>}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
            {contributionRepos.map((repo) => {
              const count = repo.themes.reduce((sum, theme) => sum + theme.prs.length, 0);
              return (
                <div key={repo.name} className="min-w-0" data-reveal>
                  <header className="flex items-baseline justify-between gap-4 border-b border-foreground/80 pb-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                        <a href={repo.repoUrl} target="_blank" rel="noreferrer" className="hover:text-primary">
                          {repo.name}
                        </a>
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                        <span lang="en">{repo.owner}</span>
                        <span className="inline-flex items-center gap-1 tabular-nums" title="上游仓库 Star 约数">
                          <Star className="size-3.5" aria-hidden="true" />
                          {repo.stars}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm tabular-nums text-muted-foreground">
                      <span className="text-foreground">{count}</span> 个 PR
                    </p>
                  </header>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{repo.intro}</p>
                  <ul className="mt-2">
                    {repo.themes.map((theme) => (
                      <li key={theme.title} className="contribution-theme">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                          <h4 className="text-base font-semibold tracking-[-0.01em]">{theme.title}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {theme.prs.map((pr) => (
                              <a
                                key={pr.number}
                                href={prUrl(repo, pr.number)}
                                target="_blank"
                                rel="noreferrer"
                                className="pr-chip"
                                title={pr.title}
                              >
                                <GitPullRequest className="size-3" aria-hidden="true" />#{pr.number}
                              </a>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{theme.summary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section id="internship" className="page-shell scroll-mt-24 pb-section">
          <SectionHeading label="实习" title="ModelPort 的来处。" />
          <div className="timeline-row mt-10 border-t border-border" data-reveal>
            <p className="text-sm tabular-nums text-muted-foreground">{internship.period}</p>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">{internship.org}</h3>
              <p className="mt-1 text-sm text-primary">{internship.role}</p>
            </div>
            <div>
              <p className="text-sm leading-7 text-muted-foreground">{internship.detail}</p>
              <ArrowLink href={projectHref(modelport.slug)} className="mt-2">对应项目：ModelPort</ArrowLink>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <div className="contact-band">
            <div className="page-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div data-reveal>
                <p className="text-sm font-medium text-primary">联系</p>
                <h2 className="contact-title mt-6">
                  <span className="block">2027 届，正在寻找</span>
                  <span className="block">大模型应用开发岗位。</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-background/72">
                  欢迎聊模型网关、Agent 运行时、记忆与检索相关的问题，邮件联系最快。
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end" data-reveal>
                <div className="flex flex-wrap gap-3">
                  <CopyEmailButton />
                  <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                    <a href={profile.github} target="_blank" rel="noreferrer">
                      GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
                <a href={`mailto:${EMAIL}`} className="text-sm text-background/72 transition-colors hover:text-background">
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

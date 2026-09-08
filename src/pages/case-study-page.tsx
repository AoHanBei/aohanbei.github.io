import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import {
  ArrowLink,
  ClaimText,
  PageFrame,
  ScreenshotFrame,
} from "@/components/site";
import { Button } from "@/components/ui/button";
import { projectHref, projects, type Project } from "@/content/projects";
import { useReveal } from "@/hooks/use-reveal";

type CaseSectionProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  children: ReactNode;
};

function CaseSection({
  index,
  eyebrow,
  title,
  description,
  id,
  children,
}: CaseSectionProps) {
  return (
    <section id={id} className="case-section page-shell scroll-mt-24" data-reveal>
      <div className="case-section-grid">
        <header className="case-section-rail">
          <p className="case-section-index">{index}</p>
          <p className="case-section-eyebrow">{eyebrow}</p>
          <h2 className="case-section-title">{title}</h2>
          {description ? (
            <p className="case-section-description">{description}</p>
          ) : null}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudyPage({ project }: { project: Project }) {
  useReveal();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageFrame footerLabel={project.name}>
      <main id="main">
        <article>
          <header className="case-hero page-shell grid grid-cols-[minmax(0,1fr)] gap-12 py-14 lg:grid-cols-[minmax(0,.8fr)_minmax(30rem,1.2fr)] lg:items-end lg:gap-[clamp(3rem,5vw,4.25rem)] lg:py-20">
            <div className="min-w-0" data-reveal>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.66rem] font-medium uppercase tracking-[0.13em] text-muted-foreground">
                <span className="text-primary">Case {project.order}</span>
                <span>{project.category}</span>
              </div>
              <h1 className="case-title mt-10 text-balance">{project.name}</h1>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.13em] text-primary">{project.categoryZh}</p>
              <ClaimText claim={project.summary} className="mt-7 max-w-xl text-pretty text-base leading-8 text-muted-foreground" />
              <dl className="mt-9 border-t border-border">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[minmax(7rem,.8fr)_minmax(0,1.2fr)] border-b border-border py-3 text-xs">
                    <dt className="uppercase tracking-[0.09em] text-muted-foreground">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#system">查看系统链路 <ArrowDown className="size-4" aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/#projects"><ArrowLeft className="size-4" aria-hidden="true" /> 返回项目</a>
                </Button>
                {project.repositoryUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      GitHub 仓库 <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            <ScreenshotFrame image={project.heroImage} eager index="FIG. 01" />
          </header>

          <CaseSection
            index="01"
            eyebrow="Problem & decision / 问题与决策"
            title="从真实阻力，到明确的系统判断。"
          >
            <div className="case-decision-list">
              <article className="case-decision-row" data-reveal>
                <p className="case-row-label">问题 / Problem</p>
                <div>
                  <h3>{project.problem.title}</h3>
                  <ClaimText claim={project.problem.body} />
                </div>
              </article>
              <article
                className="case-decision-row"
                data-reveal
                style={{ "--reveal-delay": "55ms" } as CSSProperties}
              >
                <p className="case-row-label text-primary">决策 / Decision</p>
                <div>
                  <h3>{project.approach.title}</h3>
                  <ClaimText claim={project.approach.body} />
                </div>
              </article>
            </div>
          </CaseSection>

          <CaseSection
            id="system"
            index="02"
            eyebrow={project.lifecycleLabel + " / System flow"}
            title={project.lifecycleTitle}
          >
            <ScreenshotFrame image={project.evidence[0]} index="FIG. 02" />
            <ol className="case-lifecycle-list mt-10">
              {project.lifecycle.map((step, index) => (
                <li
                  key={step.title}
                  className="case-lifecycle-row"
                  data-reveal
                  style={{ "--reveal-delay": String(index * 45) + "ms" } as CSSProperties}
                >
                  <span className="case-row-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <ClaimText claim={step.body} />
                </li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection
            index="03"
            eyebrow="Engineering controls / 工程控制"
            title="六个可验证的系统边界。"
            description={project.capabilityIntro}
          >
            <ol className="case-capability-list">
              {project.capabilities.map((capability, index) => (
                <li
                  key={capability.title}
                  className="case-capability-row"
                  data-reveal
                  style={{ "--reveal-delay": String(index * 40) + "ms" } as CSSProperties}
                >
                  <span className="case-row-number">0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <ClaimText claim={capability.body} />
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ScreenshotFrame image={project.evidence[1]} index="FIG. 03" />
            </div>
          </CaseSection>

          <CaseSection
            index="04"
            eyebrow="Tradeoffs & boundaries / 取舍与边界"
            title={project.tradeoffsTitle}
          >
            <div className="case-tradeoff-list">
              {project.tradeoffs.map((tradeoff, index) => (
                <article
                  key={tradeoff.title}
                  className="case-tradeoff-row"
                  data-reveal
                  style={{ "--reveal-delay": String(index * 45) + "ms" } as CSSProperties}
                >
                  <span className="case-row-number">0{index + 1}</span>
                  <h3>{tradeoff.title}</h3>
                  <ClaimText claim={tradeoff.body} />
                </article>
              ))}
            </div>

            <div className="case-boundary-grid mt-12" data-reveal>
              <article>
                <p className="case-row-label text-primary">适用场景 / Good fit</p>
                <h3>当前更适合</h3>
                <ClaimText claim={project.fit} />
              </article>
              <article>
                <p className="case-row-label">明确边界 / Boundary</p>
                <h3>当前不承诺</h3>
                <ClaimText claim={project.boundary} />
              </article>
            </div>
          </CaseSection>
        </article>

        <nav className="page-shell grid border-t border-border py-8 sm:grid-cols-2" aria-label="案例翻页">
          <div>
            {previous ? <ArrowLink href={projectHref(previous.slug)}><ArrowLeft className="size-4" /> {previous.shortName}</ArrowLink> : <ArrowLink href="/#projects"><ArrowLeft className="size-4" /> 返回项目</ArrowLink>}
          </div>
          <div className="mt-4 sm:mt-0 sm:text-right">
            {next ? <ArrowLink href={projectHref(next.slug)}>{next.shortName} <ArrowRight className="size-4" /></ArrowLink> : <ArrowLink href="/#projects">浏览全部项目 <ArrowRight className="size-4" /></ArrowLink>}
          </div>
        </nav>
      </main>
    </PageFrame>
  );
}

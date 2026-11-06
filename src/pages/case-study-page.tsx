import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { GatewayFlowDiagram, MemoryModelDiagram } from "@/components/diagrams";
import {
  ArrowLink,
  ClaimText,
  PageFrame,
  ProjectMeta,
  ScreenshotFrame,
} from "@/components/site";
import { Button } from "@/components/ui/button";
import {
  projectHref,
  projects,
  type BuildProject,
  type Project,
  type StudyProject,
} from "@/content/projects";
import { useReveal } from "@/hooks/use-reveal";

type CaseSectionProps = {
  label: string;
  title: string;
  id?: string;
  wide?: boolean;
  children: ReactNode;
};

function CaseSection({ label, title, id, wide = false, children }: CaseSectionProps) {
  return (
    <section id={id} className="case-section page-shell scroll-mt-24">
      <header className="case-section-head" data-reveal>
        <p className="case-section-label">{label}</p>
        <h2 className="case-section-title">{title}</h2>
      </header>
      <div className="case-section-body mt-10 min-w-0" data-wide={wide ? "true" : undefined}>{children}</div>
    </section>
  );
}

function delay(index: number, step = 45) {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}

function FitAndBoundary({ fit, boundary }: { fit?: BuildProject["fit"]; boundary: BuildProject["boundary"] }) {
  return (
    <div className="case-boundary-grid mt-12" data-reveal>
      {fit ? (
        <article>
          <h3>当前更适合</h3>
          <ClaimText claim={fit} />
        </article>
      ) : null}
      <article>
        <h3>当前不承诺</h3>
        <ClaimText claim={boundary} />
      </article>
    </div>
  );
}

function Evidence({ project }: { project: Project }) {
  return (
    <CaseSection label="界面" title="产品截图" wide>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        {project.evidence.map((image) => (
          <ScreenshotFrame key={image.title} image={image} />
        ))}
      </div>
    </CaseSection>
  );
}

function BuildBody({ project }: { project: BuildProject }) {
  return (
    <>
      <CaseSection id="system" label="架构" title={project.diagramTitle} wide>
        <div data-reveal>
          {project.diagram === "modelport" ? <GatewayFlowDiagram /> : <MemoryModelDiagram />}
        </div>
      </CaseSection>

      <CaseSection label="我实现的模块" title="每个模块防的是哪一类事故">
        <ul className="module-list">
          {project.modules.map((module, index) => (
            <li key={module.title} className="module-row" data-reveal style={delay(index)}>
              <h3>{module.title}</h3>
              <div className="module-risk">
                <p className="module-tag">要防的事故</p>
                <ClaimText claim={module.risk} />
              </div>
              <div className="module-how">
                <p className="module-tag">怎么做</p>
                <ClaimText claim={module.how} />
              </div>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection label="取舍与边界" title="刻意不做、以及做不到的事">
        <div className="case-tradeoff-list">
          {project.tradeoffs.map((tradeoff, index) => (
            <article key={tradeoff.title} className="case-tradeoff-row" data-reveal style={delay(index)}>
              <h3>{tradeoff.title}</h3>
              <ClaimText claim={tradeoff.body} />
            </article>
          ))}
        </div>
        <FitAndBoundary fit={project.fit} boundary={project.boundary} />
      </CaseSection>
    </>
  );
}

function StudyBody({ project }: { project: StudyProject }) {
  return (
    <>
      <CaseSection id="system" label="它要解决什么" title="研究答案，不等于可交付的研究工作">
        <ClaimText claim={project.problem} className="case-lead" />
        <ol className="case-flow-list mt-10">
          {project.flow.map((step, index) => (
            <li key={step.title} className="case-flow-row" data-reveal style={delay(index)}>
              <span className="case-flow-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <ClaimText claim={step.body} />
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection label="我在研究的设计" title="四个值得拆开看的机制">
        <div className="case-tradeoff-list">
          {project.studies.map((item, index) => (
            <article key={item.title} className="case-tradeoff-row" data-reveal style={delay(index)}>
              <h3>{item.title}</h3>
              <ClaimText claim={item.body} />
            </article>
          ))}
        </div>
      </CaseSection>

      <CaseSection label="我的理解" title="和我自己的项目对照着看">
        <div className="grid gap-5 md:grid-cols-3">
          {project.notes.map((note, index) => (
            <article key={note.title} className="study-note" data-reveal style={delay(index, 60)}>
              <h3>{note.title}</h3>
              <ClaimText claim={note.body} />
            </article>
          ))}
        </div>
        <FitAndBoundary boundary={project.boundary} />
      </CaseSection>
    </>
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
          <header className="case-hero page-shell grid grid-cols-[minmax(0,1fr)] gap-12 py-14 lg:grid-cols-[minmax(0,.85fr)_minmax(30rem,1.15fr)] lg:items-center lg:gap-[clamp(3rem,5vw,4.25rem)] lg:py-20">
            <div className="min-w-0" data-reveal>
              <p className="text-sm font-medium text-primary">{project.category}</p>
              <h1 className="case-title mt-4 text-balance">{project.name}</h1>
              <ClaimText claim={project.summary} className="mt-7 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-[1.0625rem]" />
              {project.kind === "build" ? (
                <ClaimText claim={project.origin} className="case-origin mt-6 max-w-xl text-sm leading-7" />
              ) : null}
              <div className="mt-8">
                <ProjectMeta project={project} />
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#system">{project.kind === "build" ? "看架构" : "看它要解决什么"} <ArrowDown className="size-4" aria-hidden="true" /></a>
                </Button>
                {project.repositoryUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                      GitHub 仓库 <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="ghost">
                  <a href="/#projects"><ArrowLeft className="size-4" aria-hidden="true" /> 全部项目</a>
                </Button>
              </div>
            </div>
            <ScreenshotFrame image={project.heroImage} eager />
          </header>

          {project.kind === "build" ? <BuildBody project={project} /> : <StudyBody project={project} />}
          <Evidence project={project} />
        </article>

        <nav className="page-shell mt-[var(--section-space)] grid border-t border-border py-8 sm:grid-cols-2" aria-label="案例翻页">
          <div>
            {previous ? (
              <ArrowLink bare href={projectHref(previous.slug)}><ArrowLeft className="size-4" /> {previous.name}</ArrowLink>
            ) : (
              <ArrowLink bare href="/#projects"><ArrowLeft className="size-4" /> 全部项目</ArrowLink>
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:text-right">
            {next ? (
              <ArrowLink bare href={projectHref(next.slug)}>{next.name} <ArrowRight className="size-4" /></ArrowLink>
            ) : (
              <ArrowLink bare href="/#projects">全部项目 <ArrowRight className="size-4" /></ArrowLink>
            )}
          </div>
        </nav>
      </main>
    </PageFrame>
  );
}

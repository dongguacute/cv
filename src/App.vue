<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  profile,
  profileOrganizations,
  profileProjects,
  profileReadmeExcerpt,
  profileSkillIconsBanner,
} from '@/lib/org'

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 30_000)
})

onUnmounted(() => {
  if (timer !== undefined)
    clearInterval(timer)
})

const localTimeText = computed(() => {
  const d = new Date(now.value)
  const hm = new Intl.DateTimeFormat('zh-CN', {
    timeZone: profile.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(d)
  return `${hm} ${profile.timeZoneLabel}`
})

const identityLine = computed(() => {
  const u = profile.username
  const p = profile.pronouns
  return p ? `${u} · ${p}` : u
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-cv-bg via-[#ebe6e0] to-[#ddd7cf] px-4 py-6 text-cv-ink antialiased sm:px-6 sm:py-10"
  >
    <div
      class="mx-auto box-border flex max-w-[1280px] flex-col gap-8 rounded-2xl border border-cv-border bg-cv-shell/95 p-5 shadow-[0_8px_30px_-8px_rgba(36,30,26,0.12),0_2px_8px_-4px_rgba(36,30,26,0.06)] ring-1 ring-white/60 backdrop-blur-sm md:flex-row md:items-start md:gap-12 md:p-8 lg:p-10"
    >
      <aside
        class="w-full max-w-[296px] shrink-0 rounded-xl bg-cv-panel/70 p-4 shadow-sm ring-1 ring-cv-border-soft md:bg-transparent md:p-0 md:shadow-none md:ring-0"
        aria-label="个人资料"
      >
        <div class="flex flex-col gap-4 md:sticky md:top-8">
          <div class="flex justify-center md:justify-start">
            <component
              :is="profile.profileUrl ? 'a' : 'div'"
              v-bind="profile.profileUrl ? { href: profile.profileUrl, target: '_blank', rel: 'noopener noreferrer' } : {}"
              class="relative inline-block shrink-0"
            >
              <img
                :src="profile.avatarSrc"
                :alt="`${profile.name} 的头像`"
                width="296"
                height="296"
                class="size-[296px] max-w-full rounded-full border-2 border-cv-border-soft object-cover shadow-md shadow-cv-ink/10 ring-4 ring-white"
              >
              <span
                class="absolute bottom-[6px] right-[6px] flex size-[26px] items-center justify-center rounded-full border border-cv-border bg-cv-panel text-[14px] leading-none shadow-sm"
                aria-hidden="true"
              >{{ profile.statusEmoji }}</span>
            </component>
          </div>

          <div class="space-y-1 text-center md:text-left">
            <h1
              class="font-['Dancing_Script',cursive] text-[28px] font-bold leading-tight text-cv-ink md:text-[30px]"
            >
              {{ profile.name }}
            </h1>
            <p class="text-lg text-cv-muted">
              {{ identityLine }}
            </p>
          </div>

          <div class="space-y-1 text-center text-sm leading-snug text-cv-ink/95 md:text-left">
            <p>{{ profile.bioLine1 }}</p>
            <p>
              <a
                class="font-medium text-cv-accent underline decoration-cv-accent/30 underline-offset-2 transition hover:text-cv-accent-hover hover:decoration-cv-accent-hover"
                :href="`mailto:${profile.contactEmail}`"
              >{{ profile.bioLine2 }}</a>
            </p>
          </div>

          <a
            class="block w-full rounded-lg bg-cv-accent px-3 py-2.5 text-center text-sm font-semibold text-white shadow-[0_2px_8px_-2px_rgba(184,74,92,0.45)] no-underline transition hover:bg-cv-accent-hover hover:shadow-[0_4px_14px_-4px_rgba(150,61,77,0.5)] active:translate-y-px"
            :href="`mailto:${profile.contactEmail}`"
          >{{ profile.contactButtonLabel }}</a>

          <ul class="flex flex-col gap-2.5 text-sm text-cv-ink">
            <li
              v-if="profile.organization"
              class="flex items-start gap-2.5"
            >
              <span class="mt-0.5 inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.75.75 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.5A1.75 1.75 0 0 1 14.25 16h-3.285a.75.75 0 0 1-.215-.1l-1.355-.904a.25.25 0 0 0-.17-.043H1.75a.25.25 0 0 0-.25.25Z" />
                </svg>
              </span>
              <a
                :href="profile.organization.url"
                class="font-semibold text-cv-ink hover:text-cv-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.organization.label }}</a>
            </li>
            <li
              v-if="profile.location"
              class="flex items-center gap-2.5"
            >
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M8 0C5.243 0 3 2.243 3 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.757-2.243-5-5-5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                </svg>
              </span>
              <span>{{ profile.location }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5Z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </span>
              <span class="text-cv-ink/90">{{ localTimeText }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
                </svg>
              </span>
              <a
                class="font-medium text-cv-accent underline decoration-cv-accent/25 underline-offset-2 hover:text-cv-accent-hover hover:decoration-cv-accent-hover"
                :href="profile.website.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.website.label }}</a>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.74-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </span>
              <a
                class="font-medium text-cv-accent underline decoration-cv-accent/25 underline-offset-2 hover:text-cv-accent-hover hover:decoration-cv-accent-hover"
                :href="profile.github.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.github.label }}</a>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M15.667 3.484c-.15-.67-.65-1.17-1.32-1.32C13.005 2 8 2 8 2s-5.005 0-6.347.164C1.984 2.324 1.484 2.824 1.334 3.494.997 5.854.997 8.33 1.334 10.7c.15.67.65 1.17 1.32 1.32 1.342.164 6.347.164 6.347.164s5.005 0 6.347-.164c.67-.15 1.17-.65 1.32-1.32.337-2.37.337-4.846 0-7.216ZM6.75 10.5v-5l4.5 2.5-4.5 2.5Z" />
                </svg>
              </span>
              <a
                class="font-medium text-cv-accent underline decoration-cv-accent/25 underline-offset-2 hover:text-cv-accent-hover hover:decoration-cv-accent-hover"
                :href="profile.youtube.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.youtube.label }}</a>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="inline-flex size-4 shrink-0 text-cv-muted" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
              </span>
              <a
                class="font-medium text-cv-accent underline decoration-cv-accent/25 underline-offset-2 hover:text-cv-accent-hover hover:decoration-cv-accent-hover"
                :href="profile.x.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.x.label }}</a>
            </li>
          </ul>

          <div
            v-if="profileOrganizations.length"
            class="mt-2 border-t border-cv-border pt-4"
          >
            <h2 class="mb-3 text-xs font-semibold tracking-wide text-cv-muted uppercase">
              Organizations
            </h2>
            <div class="flex flex-wrap items-center gap-x-1 gap-y-2">
              <template
                v-for="org in profileOrganizations"
                :key="org.login"
              >
                <a
                  :href="org.url"
                  class="inline-flex items-center gap-1.5 rounded-md p-0.5 text-sm text-cv-ink no-underline outline-none ring-cv-accent/40 transition hover:bg-cv-accent-soft/50 hover:text-cv-accent focus-visible:ring-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  :title="`@${org.login}`"
                  :data-testid="`org-badge-${org.login}`"
                >
                  <img
                    :src="org.logoSrc"
                    alt=""
                    width="32"
                    height="32"
                    class="size-8 rounded-md border border-cv-border bg-cv-panel object-cover shadow-sm"
                  >
                  <span class="font-semibold">@{{ org.login }}</span>
                </a>
              </template>
            </div>
          </div>
        </div>
      </aside>

      <main
        class="min-h-[200px] flex-1 overflow-hidden rounded-xl border border-cv-border bg-cv-panel shadow-[0_2px_12px_-4px_rgba(36,30,26,0.08)] ring-1 ring-cv-border-soft/80"
      >
        <div class="flex items-center gap-2 border-b border-cv-border bg-cv-shell/80 px-4 py-2.5 text-sm text-cv-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            class="shrink-0 text-cv-muted"
            aria-hidden="true"
          >
            <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 7.324a.75.75 0 0 0 .04.901c1.233 1.358 3.443 1.358 4.677-.04l.831-.915a.75.75 0 0 1 .82-.211l1.148.483a.232.232 0 0 1 .092.312l-1.82 3.645a.75.75 0 0 1-1.34 0l-1.82-3.645a.232.232 0 0 1 .092-.312l1.148-.483a.75.75 0 0 1 .82.211l.83.915c1.086 1.183 2.991 1.183 4.077 0a.763.763 0 0 0 .04-.901l-2.188-4.745a.75.75 0 0 0-.69-.43H7.941a.75.75 0 0 0-.69.43Z" />
          </svg>
          <span class="font-mono text-xs text-cv-ink/80">{{ profileReadmeExcerpt.filePath }}</span>
        </div>
        <article class="p-6 text-cv-ink">
          <h1 class="mb-3 border-0 text-xl font-bold text-cv-ink">
            {{ profileReadmeExcerpt.heading }}
          </h1>
          <p class="text-sm font-semibold text-cv-ink">
            {{ profileReadmeExcerpt.tagline }}
          </p>
          <p class="mt-3 text-sm italic text-cv-muted">
            「 {{ profileReadmeExcerpt.quote }} 」
          </p>
          <p class="mt-6 text-xs text-cv-muted">
            完整仓库与动态见
            <a
              href="https://github.com/dongguacute"
              class="font-medium text-cv-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >GitHub 主页</a>
            。
          </p>
        </article>

        <section
          v-if="profileProjects.length"
          class="border-t border-cv-border px-6 pb-6"
          aria-label="项目列表"
        >
          <h2 class="mb-4 pt-2 text-sm font-semibold text-cv-ink">
            项目
          </h2>
          <ul class="flex flex-col gap-4 text-sm">
            <li
              v-for="project in profileProjects"
              :key="project.slug"
            >
              <a
                :href="project.url"
                class="font-semibold text-cv-accent no-underline underline-offset-2 transition hover:text-cv-accent-hover hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                :data-testid="`project-${project.slug}`"
              >{{ project.name }}</a>
              <p class="mt-1 text-sm leading-snug text-cv-muted">
                {{ project.description }}
              </p>
            </li>
          </ul>
        </section>

        <section
          class="border-t border-cv-border px-6 pb-6"
          aria-label="能力"
        >
          <h2 class="mb-4 pt-2 text-sm font-semibold text-cv-ink">
            能力（部分为少量使用，web框架或编程语言为长期大量使用）
          </h2>
          <a
            :href="profileSkillIconsBanner.href"
            class="block overflow-hidden rounded-lg ring-1 ring-cv-border-soft transition hover:ring-cv-accent/35"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="skill-icons-banner"
          >
            <img
              :src="profileSkillIconsBanner.src"
              alt="Skill icons：常用工具与技术栈图标墙"
              class="h-auto w-full max-w-full bg-cv-shell/40"
              loading="lazy"
              decoding="async"
            >
          </a>
          <p class="mt-2 text-xs text-cv-muted">
            图标由
            <a
              href="https://skillicons.dev"
              class="font-medium text-cv-accent no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >skillicons.dev</a>
            生成。
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

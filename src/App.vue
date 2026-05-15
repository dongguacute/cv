<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { profile } from '@/lib/org'

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
  <div class="min-h-screen bg-[#e8ecf0] px-4 py-6 text-[#1f2328] antialiased sm:px-6 sm:py-8">
    <div
      class="mx-auto box-border flex max-w-[1280px] flex-col gap-6 rounded-2xl border border-[#d1d9e0] bg-[#f6f8fa] p-5 shadow-[0_1px_3px_rgba(31,35,40,0.12)] md:flex-row md:items-start md:gap-10 md:p-8 lg:p-10"
    >
      <aside
        class="w-full max-w-[296px] shrink-0 bg-white md:bg-transparent"
        aria-label="个人资料"
      >
        <div class="flex flex-col gap-4 md:sticky md:top-8">
          <!-- Avatar + status -->
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
                class="size-[296px] max-w-full rounded-full border border-[#d1d9e0] object-cover"
              >
              <span
                class="absolute bottom-[6px] right-[6px] flex size-[26px] items-center justify-center rounded-full border border-[#d1d9e0] bg-white text-[14px] leading-none shadow-sm"
                aria-hidden="true"
              >{{ profile.statusEmoji }}</span>
            </component>
          </div>

          <div class="space-y-1 text-center md:text-left">
            <h1 class="font-['Dancing_Script',cursive] text-[26px] font-bold leading-tight text-[#1f2328]">
              {{ profile.name }}
            </h1>
            <p class="text-lg text-[#59636e]">
              {{ identityLine }}
            </p>
          </div>

          <div class="space-y-1 text-center text-sm leading-snug text-[#1f2328] md:text-left">
            <p>{{ profile.bioLine1 }}</p>
            <p>
              <a
                class="text-[#0969da] hover:underline"
                :href="`mailto:${profile.contactEmail}`"
              >{{ profile.bioLine2 }}</a>
            </p>
          </div>

          <a
            class="block w-full rounded-md border border-[#d1d9e0] bg-[#f6f8fa] py-1.5 text-center text-sm font-medium text-[#24292f] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] no-underline hover:bg-[#eff2f5] active:bg-[#e7eaed]"
            :href="`mailto:${profile.contactEmail}`"
          >{{ profile.contactButtonLabel }}</a>

          <ul class="flex flex-col gap-2 text-sm text-[#1f2328]">
            <li
              v-if="profile.organization"
              class="flex items-start gap-2"
            >
              <span class="mt-0.5 inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.75.75 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.5A1.75 1.75 0 0 1 14.25 16h-3.285a.75.75 0 0 1-.215-.1l-1.355-.904a.25.25 0 0 0-.17-.043H1.75a.25.25 0 0 0-.25.25Z" />
                </svg>
              </span>
              <a
                :href="profile.organization.url"
                class="font-semibold text-[#1f2328] hover:text-[#0969da] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.organization.label }}</a>
            </li>
            <li
              v-if="profile.location"
              class="flex items-center gap-2"
            >
              <span class="inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M8 0C5.243 0 3 2.243 3 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.757-2.243-5-5-5Zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                </svg>
              </span>
              <span>{{ profile.location }}</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5Z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </span>
              <span>{{ localTimeText }}</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
                </svg>
              </span>
              <a
                class="text-[#0969da] hover:underline"
                :href="profile.website.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.website.label }}</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M15.667 3.484c-.15-.67-.65-1.17-1.32-1.32C13.005 2 8 2 8 2s-5.005 0-6.347.164C1.984 2.324 1.484 2.824 1.334 3.494.997 5.854.997 8.33 1.334 10.7c.15.67.65 1.17 1.32 1.32 1.342.164 6.347.164 6.347.164s5.005 0 6.347-.164c.67-.15 1.17-.65 1.32-1.32.337-2.37.337-4.846 0-7.216ZM6.75 10.5v-5l4.5 2.5-4.5 2.5Z" />
                </svg>
              </span>
              <a
                class="text-[#0969da] hover:underline"
                :href="profile.youtube.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.youtube.label }}</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="inline-flex size-4 shrink-0 text-[#59636e]" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
              </span>
              <a
                class="text-[#0969da] hover:underline"
                :href="profile.x.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ profile.x.label }}</a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="min-h-[200px] flex-1 rounded-xl border border-[#d1d9e0] bg-white p-6 shadow-sm">
        <p class="text-sm text-[#59636e]">
          这里可以放项目列表、经历时间线等内容。
        </p>
      </main>
    </div>
  </div>
</template>


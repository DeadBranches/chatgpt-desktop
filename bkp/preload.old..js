const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  toggleSidebar: () => {
    document.querySelector('html.dark body div#__next div.overflow-hidden.w-full.h-full.relative div.dark.hidden.bg-gray-900.md:fixed.md:inset-y-0.md:flex.md:w-[260px].md:flex-col').classList.toggle('hidden')
  },
  setBackgroundColor: (color) => {
    document.querySelector('html.dark body div#__next div.overflow-hidden.w-full.h-full.relative div.flex.h-full.flex-1.flex-col.md:pl-[260px] main.relative.h-full.w-full.transition-width.flex.flex-col.overflow-hidden.items-stretch.flex-1').style.backgroundColor = color
  },
  getModelVersion: () => {
    return document.querySelector('div.flex.w-full.items-center.justify-center.gap-1.border-b.border-black/10.bg-gray-50.p-3.text-gray-500.dark:border-gray-900/50.dark:bg-gray-700.dark:text-gray-300').innerText
  },
  getBotResponse: () => {
    return document.querySelector('html.dark body div#__next div.overflow-hidden.w-full.h-full.relative div.flex.h-full.flex-1.flex-col.md:pl-[260px] main.relative.h-full.w-full.transition-width.flex.flex-col.overflow-hidden.items-stretch.flex-1 div.flex-1.overflow-hidden div.react-scroll-to-bottom--css-uoyon-79elbk.h-full.dark:bg-gray-800 div.react-scroll-to-bottom--css-uoyon-1n7m0yu div.flex.flex-col.items-center.text-sm.dark:bg-gray-800 div.group.w-full.text-gray-800.dark

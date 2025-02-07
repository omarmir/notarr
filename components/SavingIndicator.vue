<template>
  <div>
    <svg
      v-if="status === 'pending'"
      xmlns="http://www.w3.org/2000/svg"
      class="size-4 text-amber-500"
      viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12" />
        </path>
        <path
          stroke-dasharray="64"
          stroke-dashoffset="64"
          stroke-opacity="0.3"
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
        </path>
      </g>
    </svg>
    <svg
      v-else-if="status === 'success'"
      xmlns="http://www.w3.org/2000/svg"
      class="size-4 text-emerald-600"
      viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0" />
    </svg>
  </div>
</template>
<script lang="ts" setup>
import type { SavingState } from '~/types/notebook'

const { status } = defineProps<{ status: SavingState }>()
</script>

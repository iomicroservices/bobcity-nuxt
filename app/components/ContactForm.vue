<script setup lang="ts">
const props = defineProps<{
  services?: Array<{ title: string, path: string, stem?: string }>
}>()

const toast = useToast()
const runtimeConfig = useRuntimeConfig()
const turnstileEnabled = computed(() => Boolean(runtimeConfig.public.turnstile?.siteKey))

const state = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '' // honeypot
})

const turnstileToken = ref('')
const pending = ref(false)
const submitted = ref(false)

const serviceOptions = computed(() =>
  (props.services ?? []).map(service => ({
    label: service.title,
    value: service.stem || service.path.split('/').pop() || service.title
  }))
)

async function onSubmit() {
  if (state.website) {
    submitted.value = true
    return
  }

  if (turnstileEnabled.value && !turnstileToken.value) {
    toast.add({
      title: 'Please complete the security check',
      color: 'warning'
    })
    return
  }

  pending.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: state.name,
        email: state.email,
        phone: state.phone,
        service: state.service,
        message: state.message,
        turnstileToken: turnstileToken.value
      }
    })
    submitted.value = true
    toast.add({
      title: 'Quote request sent',
      description: 'We will get back to you shortly.',
      color: 'success'
    })
  } catch {
    toast.add({
      title: 'Could not send your request',
      description: 'Please try again or call us directly.',
      color: 'error'
    })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div>
    <div
      v-if="submitted"
      class="rounded-xl border border-primary/30 bg-primary/5 p-6"
    >
      <h3 class="font-display text-xl font-semibold text-highlighted">
        Thanks — we have your request
      </h3>
      <p class="mt-2 text-muted">
        A confirmation email is on its way. We will reply as soon as we can.
      </p>
    </div>

    <UForm
      v-else
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <UFormField
        label="Name"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          autocomplete="name"
          required
          class="w-full"
        />
      </UFormField>

      <div class="grid gap-5 sm:grid-cols-2">
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            autocomplete="email"
            required
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Phone"
          name="phone"
        >
          <UInput
            v-model="state.phone"
            type="tel"
            autocomplete="tel"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField
        label="Service"
        name="service"
      >
        <USelect
          v-model="state.service"
          :items="serviceOptions"
          placeholder="Select a service"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="How can we help?"
        name="message"
        required
      >
        <UTextarea
          v-model="state.message"
          :rows="5"
          required
          class="w-full"
          placeholder="Tell us about the job, location, and preferred timing."
        />
      </UFormField>

      <!-- Honeypot -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-[-9999px] opacity-0"
      >
        <label>
          Website
          <input
            v-model="state.website"
            tabindex="-1"
            autocomplete="off"
          >
        </label>
      </div>

      <NuxtTurnstile
        v-if="turnstileEnabled"
        v-model="turnstileToken"
      />

      <UButton
        type="submit"
        :loading="pending"
        trailing-icon="i-lucide-send"
      >
        Send quote request
      </UButton>
    </UForm>
  </div>
</template>

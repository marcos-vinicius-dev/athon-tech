<script>

export default {
  name: 'MainLayout'
}
</script>

<template lang="pug">
q-layout(view="hHh lpR fff")
  q-header(
    elevated
    class="bg-primary"
  )
    q-toolbar(
      bordered
      class="cinzel"
      style="min-height:67px"
    )
      q-img(
        src="../assets/logo.png"
        width="114px"
        class="cursor-pointer"
        @click="$router.push('/')"
      )

  q-page-container(style="padding-top: 43px; !important")
    q-page(class="container")
      router-view

  q-footer(
    elevated
    class="bg-primary"
    style="min-height:60px"
  )

</template>

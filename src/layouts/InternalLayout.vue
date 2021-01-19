<script>

export default {
  name: 'InternalLayout'
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
      style="min-height:67px"
    )
      div(class="row items-center full-width")
        div(class="col-2")
          q-btn(
            flat
            class="text-accent"
            @click="$router.back()"
          )
            q-icon(
              name="fa fa-arrow-left"
              size="20px"
            )

        div(class="col-8 desktop-hide")
          div(class="row justify-center")
            div(
              class="text-accent cinzel text-h6 text-bold cursor-pointer"
              @click="$router.push('/')"
            )
              | {{  $route.meta.title }}

        div(class="col-2")

  q-page-container(style="padding-top: 44px; !important")
    q-page(class="container")
      router-view

</template>

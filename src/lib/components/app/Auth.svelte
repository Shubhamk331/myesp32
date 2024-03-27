<script lang="ts">
  import Button from "../ui/button/button.svelte";

  export let signInWithGoogle: () => void;
</script>

<div
  class="flex flex-col min-h-screen container mx-auto items-center justify-center"
>
  <h2
    class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    Park.io
  </h2>
  <p class="text-muted-foreground">Sign in to continue</p>
  <Button
    on:click={signInWithGoogle}
    class="flex items-center gap-2 mt-4 w-full"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
      alt="Google"
      class="h-5 w-5"
    />
    <span> Sign in with Google </span>
  </Button>
</div>

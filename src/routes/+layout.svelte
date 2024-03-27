<script lang="ts">
  import "../app.pcss";
  import { FirebaseApp, SignedIn, SignedOut } from "sveltefire";
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { ModeWatcher } from "mode-watcher";

  import { auth } from "$lib/firebase";
  import Button from "$lib/components/ui/button/button.svelte";
  import Auth from "$lib/components/app/Auth.svelte";
  import Header from "$lib/components/app/Header.svelte";
  import { Toaster } from "$lib/components/ui/sonner";

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log("Signed in", res);
      })
      .catch((err) => {
        console.log("Failed to sign in", err);
      });
  }
</script>

<ModeWatcher defaultMode="dark" />
<Toaster />

<FirebaseApp {auth}>
  <SignedIn>
    <Header />
    <div class="container mx-auto flex flex-col">
      <slot />
    </div>
  </SignedIn>

  <SignedOut>
    <Auth {signInWithGoogle} />
  </SignedOut>
</FirebaseApp>

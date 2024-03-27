<script lang="ts">
  import { nodeStore, userStore } from "sveltefire";
  import Greeter from "greeting-time";
  import { CarFrontIcon, DoorOpenIcon, ScanFaceIcon } from "lucide-svelte";

  import { auth, rtdb } from "$lib/firebase";
  import { cn } from "$lib/utils";
  import Button from "$lib/components/ui/button/button.svelte";
  import { signOut } from "firebase/auth";
  import { toast } from "svelte-sonner";

  const msg = Greeter(new Date());

  const currentUser = userStore(auth);
  const rfid = nodeStore(rtdb, "data/rfid");
  const ir = nodeStore(rtdb, "data/ir_sensor");
  const gates = nodeStore(rtdb, "data/gates");

  function handleSignOut() {
    toast.promise(signOut(auth), {
      loading: "Sign out",
      success: "Signed out successfully",
      error(error: any) {
        return `${error.message}`;
      },
    });
  }
</script>

<div class="flex flex-col gap-4">
  <div>
    <span class="text-muted-foreground text-xl">{msg}</span>,
    <p class="text-3xl font-bold">{$currentUser?.displayName}</p>
    <span>Get a view at current parking status</span>
  </div>
  <div class="grid grid-cols-1 gap-2">
    <!-- rfid -->
    <div
      class="border border-amber-500 p-4 rounded-md bg-gradient-to-tr from-foreground/5 dark:to-amber-900 to-amber-100"
    >
      <p class="text-muted-foreground flex items-center">
        <ScanFaceIcon class="w-4 h-4 mr-2" />
        <span>Last scaned rfid</span>
      </p>
      <p class="text-lg font-semibold">
        {$rfid?.toUpperCase()}
      </p>
    </div>
    <!-- ir -->
    <div
      class={cn(
        "border p-4 rounded-md bg-gradient-to-tr from-foreground/5 transition",
        $ir === "detected"
          ? "border-emerald-500 dark:to-emerald-900 to-emerald-100"
          : "border-rose-500 dark:to-rose-900 to-rose-100"
      )}
    >
      <p class="text-muted-foreground flex items-center">
        <CarFrontIcon class="w-4 h-4 mr-2" />
        <span>Vehical detection</span>
      </p>
      <p class="text-lg font-semibold">
        {$ir === "detected" ? "Vehical detected" : "Vehical undetected"}
      </p>
    </div>
    <!-- gates -->
    <div
      class={cn(
        "border p-4 rounded-md bg-gradient-to-tr from-foreground/5 transition",
        $gates != "0"
          ? "border-green-500 dark:to-green-900 to-green-100"
          : "border-red-500 dark:to-red-900 to-red-100"
      )}
    >
      <p class="text-muted-foreground flex items-center">
        <DoorOpenIcon class="w-4 h-4 mr-2" />
        <span>Camera</span>
      </p>
      <p class="text-lg font-semibold">
        {$gates != "0" ? "Detected" : "Undected"}
      </p>
    </div>
  </div>
  <Button on:click={handleSignOut} variant="destructive">Sign out</Button>
</div>

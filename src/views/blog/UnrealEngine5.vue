<script setup>
import Navbar from '../../components/Navbar.vue';
// Use the networking-focused image you provided
import ue5NetImage from '../../assets/images/fix-unnecessary-rpc.webp'
</script>

<template>
  <div>
    <Navbar />
    
    <div class="container mx-auto lg:px-[5em] px-[9em] mt-[50px] mb-[100px]">
      <div class="max-w-4xl mx-auto">
        <!-- Blog post header -->
        <div class="mb-[40px]">
          <p class="text-[#CCF303] text-[16px] mb-[10px]">June 15, 2024</p>
          <h1 class="font-atyp-display font-semibold lg:text-[3em] text-[36px] mb-[20px]">Getting Started with Networking in Unreal Engine 5</h1>
          <p class="font-atyp-display text-[#6B767F] lg:text-[1.25em] text-[18px]">
            A practical introduction to UE5 networking: authority and roles, property replication, RPCs (Server/Client/NetMulticast), movement, sessions, and common pitfalls.
          </p>
        </div>
        
        <!-- Featured image -->
        <div class="w-full h-[400px] overflow-hidden rounded-[1.375em] mb-[40px]">
          <img class="w-full h-full object-cover object-center" :src="ue5NetImage" alt="UE5 Networking">
        </div>
        
        <!-- Blog content -->
        <div class="font-atyp-display lg:text-[1.125em] text-[16px] space-y-[30px]">
          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">UE5 Networking Overview</h2>
          <p>
            Unreal’s networking model is server-authoritative. The server owns the truth; clients own only what they’re
            permitted to control. Gameplay state is synchronized via property replication and Remote Procedure Calls (RPCs).
            If you learn authority/roles, replication, and RPCs, you can build most multiplayer features correctly.
          </p>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Authority, Role, and Ownership</h2>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li><span class="text-white font-semibold">Authority:</span> On the server, <code>HasAuthority()</code> is true for actors the server controls.</li>
            <li><span class="text-white font-semibold">Role:</span> On clients, <code>GetLocalRole()</code> is typically <code>ROLE_AutonomousProxy</code> for locally controlled pawns, otherwise <code>ROLE_SimulatedProxy</code>.</li>
            <li><span class="text-white font-semibold">Ownership:</span> Determines whether a client can send Server RPCs on an actor. PlayerController → Pawn → Components often form the ownership chain.</li>
          </ul>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Property Replication</h2>
          <p>
            Mark properties with <code>Replicated</code> and register them in <code>GetLifetimeReplicatedProps</code>. Use <code>ReplicatedUsing</code> to trigger hooks on clients when values change.
          </p>
          <div class="bg-[#0B1217] rounded-md p-4 overflow-x-auto">
            <pre class="text-sm"><code>// MyActor.h
UPROPERTY(ReplicatedUsing=OnRep_Health)
float Health = 100.f;

UFUNCTION()
void OnRep_Health();

// MyActor.cpp
void AMyActor::GetLifetimeReplicatedProps(TArray&lt;FLifetimeProperty&gt;&gt; &Out) const
{
    Super::GetLifetimeReplicatedProps(Out);
    DOREPLIFETIME(AMyActor, Health);
}

void AMyActor::OnRep_Health()
{
    // Update UI, play VFX, etc.
}</code></pre>
          </div>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">RPCs: Server, Client, NetMulticast</h2>
          <p>
            RPCs send function calls across the network. Keep them minimal and validate inputs on the server.
          </p>
          <div class="bg-[#0B1217] rounded-md p-4 overflow-x-auto space-y-4">
            <pre class="text-sm"><code>// Server RPC from owning client → server
UFUNCTION(Server, Reliable)
void Server_TryFire(const FVector&amp; AimDir);

void AMyWeapon::Server_TryFire_Implementation(const FVector&amp; AimDir)
{
    if (!CanFire(AimDir)) return; // validate
    SpawnProjectile(AimDir);
}</code></pre>
            <pre class="text-sm"><code>// Client RPC from server → specific owning client
UFUNCTION(Client, Reliable)
void Client_ShowHitmarker();

void AMyPlayerController::Client_ShowHitmarker_Implementation()
{
    HUD-&gt;ShowHitmarker();
}</code></pre>
            <pre class="text-sm"><code>// NetMulticast RPC from server → all clients (use sparingly)
UFUNCTION(NetMulticast, Unreliable)
void Multicast_PlayMuzzleFX();

void AMyWeapon::Multicast_PlayMuzzleFX_Implementation()
{
    Niagara-&gt;Activate();
}</code></pre>
          </div>
          <p class="text-[#6B767F]">
            Tip: Prefer property replication to mirror state; use RPCs for events/commands. Avoid unnecessary multicast RPCs—replicated state with cosmetic client-side reactions is often cheaper and more robust.
          </p>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Character Movement & Prediction</h2>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li>Use <code>CharacterMovementComponent</code> defaults first; UE’s built-in client prediction and server reconciliation are strong.</li>
            <li>Replicate only what’s needed (e.g., compressed movement). Avoid replicating transforms manually every tick.</li>
            <li>For custom pawns, copy the approach: client generates inputs, server simulates authoritative movement, state is replicated back.</li>
          </ul>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Creating a Session (Online Subsystem)</h2>
          <p>
            For quick LAN or EOS sessions, use the Online Subsystem. In Blueprints: <em>Create Session</em>, <em>Find Sessions</em>, <em>Join Session</em>.
            In C++, get the <code>IOnlineSessionPtr</code> and create/search/join with delegates.
          </p>
          <div class="bg-[#0B1217] rounded-md p-4 overflow-x-auto">
            <pre class="text-sm"><code>IOnlineSubsystem* OSS = IOnlineSubsystem::Get();
IOnlineSessionPtr Sessions = OSS ? OSS-&gt;GetSessionInterface() : nullptr;
// Fill FOnlineSessionSettings and call Sessions-&gt;CreateSession(...)</code></pre>
          </div>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Common Pitfalls</h2>
          <ul class="list-disc pl-[20px] space-y-[10px]">
            <li>Calling Server RPCs on actors you don’t own → the call won’t run. Ensure proper ownership or route via the PlayerController.</li>
            <li>Replicating heavy structs too often → add <code>COND_SkipOwner</code>, use <code>OnRep</code> to batch UI updates, or reduce frequency.</li>
            <li>Using multicast RPCs for authoritative state → replicate state instead; reserve multicast for lightweight effects.</li>
            <li>Forgetting to set <code>bReplicates = true</code> and, if needed, <code>bReplicateMovement = true</code> on actors.</li>
          </ul>

          <h2 class="font-semibold lg:text-[2em] text-[28px] text-white">Wrapping Up</h2>
          <p>
            With a solid grasp of authority, property replication, and RPC patterns, you can build reliable multiplayer features in UE5.
            Start small: replicate a health value, add a Server RPC to apply damage, then expand to movement, inventory, and abilities.
          </p>
          
          <div class="pt-[30px]">
            <router-link to="/PortfolioWebsite/#blog" class="text-[#CCF303] hover:underline">← Back to Blog</router-link>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
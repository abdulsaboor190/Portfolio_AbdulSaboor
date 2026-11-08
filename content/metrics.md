# Metrics Sheet — Abdul Saboor Portfolio

Every number on the site must come from this sheet. Values stay `TODO`
until measured from real runs/artifacts — see **Truth rules** at the bottom.

JSON schema for these records lives in `content/metrics.schema.json`.

---

## Traffic Control — AI-Powered Adaptive Traffic Control System

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| Avg. vehicle waiting time — fixed-timer baseline | TODO | seconds/veh | SUMO `tripinfo` output, mean over all completed trips |
| Avg. vehicle waiting time — PPO agent | TODO | seconds/veh | Same, same scenarios |
| Avg. queue length — baseline vs PPO | TODO | vehicles | Loop-detector occupancy or lane halting counts sampled each sim step |
| Throughput — baseline vs PPO | TODO | vehicles/hour | Departed vehicles ÷ simulated hour |
| Number of simulation runs per condition | TODO | runs | Count of eval episodes (recommend ≥30, see protocol) |
| Traffic scenarios tested | TODO | scenarios | e.g. low / medium / high demand — name them |
| Random seeds used | TODO | seeds | Record seed list; must be identical across conditions |
| Training episodes / convergence point | TODO | episodes | From SB3 `eval_callback` / tensorboard logs |

## TicketFlow — Campus Maintenance & Issue Tracking

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| API endpoints | TODO | count | Count route definitions in Express router files |
| Database tables | TODO | count | `\dt` in psql, or count Prisma/schema migrations |
| Roles implemented | TODO | count | Reporter, Technician, Admin — verify in auth middleware |
| Status transitions enforced | TODO | count | Count edges in the status workflow (e.g. Open→Assigned→In Progress→Resolved→Closed) |
| TODO: auth mechanism detail | TODO | — | JWT — note expiry/refresh strategy if asked |

## Scholr — Student Book Sharing App

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| Services containerized | TODO | count | `docker-compose.yml` service count |
| Real-time messaging implementation | TODO | — | Socket.IO / WebSocket / polling — state the actual tech |
| TODO: supported platforms | TODO | — | iOS, Android, or both (Expo/React Native build targets) |
| TODO: offline behavior | TODO | — | Does it work without connectivity? Yes/no + how |

## ShieldHer — In progress

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| TODO: current milestone | TODO | — | e.g. "MVP screens complete" |
| TODO: stack so far | TODO | — | Confirm what's actually built vs planned |

*Rule for in-progress projects: only publish metrics for things that exist.
"X% complete" estimates are not allowed.*

## FSCM — FAST Sports Complex Management System

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| Entities modeled | TODO | count | Count tables/models: Facility, Event, Equipment, Booking, User, Role… |
| API endpoints | TODO | count | Count REST routes |
| Role-based dashboards | TODO | count | Count distinct dashboard views per role |
| TODO: deployment status | TODO | — | Live URL or "not deployed" — be honest |

## FAST Past Papers

| Metric | Value | Unit | How to measure |
|---|---|---|---|
| Visitors | TODO | count | Vercel Analytics (or Plausible/GA if used) — pick a date range and say which |
| Papers available | TODO | count | Count entries in the data source (JSON/DB) |
| Deployment | TODO | — | Vercel project URL + deploy date |
| TODO: subjects covered | TODO | count | From catalog |

---

## Traffic Benchmark Protocol

Goal: produce a defensible "PPO agent vs fixed-timer" comparison. Every
number below must come from **real simulation runs** — no estimates, no
hand-picked episodes, no rounding in your favor.

### Setup

1. **Baseline controller:** fixed-time signal plan. Either the network's
   default `tls` program or an equivalent fixed cycle you define — write
   down which, with the exact phase durations.
2. **Agent controller:** the trained PPO policy (Stable-Baselines3).
   Load the *same checkpoint* for every evaluation run — never retrain
   between eval runs.
3. **Scenario file:** one `.rou.xml` demand file per scenario. Create at
   least 3: low, medium, high demand (e.g. 500 / 1,500 / 3,000 veh/hour —
   TODO: confirm your actual demand levels).
4. **Network:** identical `net.xml` and `net.net.xml` for both conditions.
   Only the signal controller changes.

### Runs

- **≥30 episodes per condition per scenario** (60 total per scenario,
  180+ total). 30 is the minimum for a defensible mean ± std.
- **Same seed list for both conditions.** Generate seeds `0..29` (or your
  chosen range), run baseline and PPO on each seed under each scenario.
  The only difference between paired runs is the controller.
- **Warmup:** discard the first 300 simulated seconds of each run so
  queues reach steady state before measurement.
- **Duration:** 1 simulated hour of measurement after warmup.

### Metrics to log per run

From SUMO outputs (`tripinfo`, `lanearea`, `summary`):

- `waitingTime` per vehicle → average waiting time (s/veh)
- `timeLoss` per vehicle (optional, strengthens the claim)
- Lane `haltingNumber` / `occupancy` sampled every 10 sim-seconds →
  average queue length (veh)
- `arrived` / `departed` counts → throughput (veh/hour)
- `teleports` and `loaded` counts → sanity check for simulation errors

### Aggregation

1. Per run: compute each metric as a single scalar.
2. Per scenario: mean and sample standard deviation (ddof=1) across the
   30 runs, per condition.
3. Report as `mean ± std` — e.g. `42.3 ± 5.1 s/veh`. If PPO's mean is
   lower on waiting time and higher on throughput across all three
   scenarios, the claim holds. If it doesn't, report what you got.

### Honesty clause

- If a scenario shows PPO *losing* to fixed-time, say so or drop that
  scenario with a stated reason — never silently exclude runs.
- Record the SUMO version, scenario files, seed list, and checkpoint
  hash in `metrics.md` notes so the benchmark is reproducible.
- "X% improvement" claims must state the baseline metric and scenario.

---

## Truth Rules

1. **No rounding up.** Report measured values as measured — `42.3 s`, not
   `~40 s`. Rounding is allowed only for display (one decimal) and must
   round to nearest, never up.
2. **No estimates as measurements.** A number you didn't measure goes in
   as `TODO` or gets a note saying it's an estimate — and estimates are
   labeled `estimate`, never `measured`.
3. **Every number needs a source.** Each filled value must carry a `source`
   note: which file, run, dashboard, or export produced it (e.g.
   "tripinfo_run17_seed04.xml, eval batch 2026-11", "Vercel Analytics,
   last 30 days").
4. **Reproducibility for benchmarks.** The traffic numbers must be
   regenerable from the recorded seeds, scenario files, and checkpoint.
5. **When in doubt, cut it.** A smaller true claim beats a bigger shaky
   one. If you can't defend the number in an interview, it doesn't go on
   the site.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Fleet data (names, prices, photos, credits) lives only in `src/data/fleet.ts`; pages read from it so prices never drift between pages.
- Business contact details and map URLs live in `src/data/business.ts`; never hard-code them in pages.
- Site photos/video are Lovable Assets pointers under `src/assets/**`, exposed through `src/data/media.ts`; reference them via `PHOTOS`/`HERO_MEDIA`, never raw URLs.
- Booking and contact forms insert straight into `booking_enquiries` / `contact_messages` with the browser client; those tables are insert-only for visitors (no read policies) so submissions stay private.
- Form validation rules live in `src/lib/booking-schema.ts` and are covered by `booking-schema.test.ts`; the DB repeats the date rules as a safety net.
- `/booking` accepts an optional `?bike=<slug>` search param to preselect a bike; link with `search={{ bike: slug }}`.
